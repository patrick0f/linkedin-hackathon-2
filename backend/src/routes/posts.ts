import express, { Request, Response } from 'express';
import { supabase } from '../config/supabase';
import type { Post } from '../types/database.types';

const router = express.Router();

// Get all posts
router.get('/', async (req: Request, res: Response) => {
  try {
    const { data, error } = await supabase
      .from('posts_activity')
      .select('*')
      .order('id', { ascending: false });

    if (error) throw error;
    
    res.json(data);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Get post by ID
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const { data, error } = await supabase
      .from('posts_activity')
      .select('*, users(id, name)')
      .eq('id', req.params.id)
      .single();

    if (error) throw error;
    if (!data) {
      return res.status(404).json({ error: 'Post not found' });
    }
    
    res.json(data);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Create new post
router.post('/', async (req: Request, res: Response) => {
  try {
    const { user_id, post_text, pic_link } = req.body;
    
    if (!user_id || !post_text) {
      return res.status(400).json({ error: 'user_id and post_text are required' });
    }

    const { data, error } = await supabase
      .from('posts_activity')
      .insert([
        {
          user_id,
          post_text,
          pic_link,
          comments: [],
          num_of_likes: 0
        }
      ])
      .select()
      .single();

    if (error) throw error;
    
    res.status(201).json(data);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Update post
router.put('/:id', async (req: Request, res: Response) => {
  try {
    const updates: Partial<Post> = req.body;
    const { data, error } = await supabase
      .from('posts_activity')
      .update(updates)
      .eq('id', req.params.id)
      .select()
      .single();

    if (error) throw error;
    
    res.json(data);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Delete post
router.delete('/:id', async (req: Request, res: Response) => {
  try {
    const { error } = await supabase
      .from('posts_activity')
      .delete()
      .eq('id', req.params.id);

    if (error) throw error;
    
    res.status(204).send();
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Like a post
router.post('/:id/like', async (req: Request, res: Response) => {
  const postId = req.params.id;
  const { user_id } = req.body;

  console.log('Like request received:', {
    postId,
    user_id,
    body: req.body
  });

  if (!user_id) {
    console.log('Missing user_id in request');
    return res.status(400).json({ error: 'user_id is required' });
  }

  try {
    // Get the current post
    console.log('Fetching post:', postId);
    const { data: post, error: postError } = await supabase
      .from('posts_activity')
      .select('num_of_likes')
      .eq('id', postId)
      .single();
    
    if (postError) {
      console.error('Error fetching post:', postError);
      throw postError;
    }
    if (!post) {
      console.log('Post not found:', postId);
      return res.status(404).json({ error: 'Post not found' });
    }

    console.log('Current post state:', post);

    // Update the post's like count
    console.log('Updating post likes:', {
      postId,
      currentLikes: post.num_of_likes,
      newLikes: post.num_of_likes + 1
    });

    const { data: updatedPost, error: updateError } = await supabase
      .from('posts_activity')
      .update({ 
        num_of_likes: post.num_of_likes + 1
      })
      .eq('id', postId)
      .select()
      .single();
    
    if (updateError) {
      console.error('Error updating post:', updateError);
      throw updateError;
    }

    // Get current user data
    console.log('Fetching user:', user_id);
    const { data: currentUser, error: getCurrentUserError } = await supabase
      .from('users')
      .select('streak_count')
      .eq('id', user_id)
      .single();
    
    if (getCurrentUserError) {
      console.error('Error fetching user:', getCurrentUserError);
      throw getCurrentUserError;
    }
    if (!currentUser) {
      console.log('User not found:', user_id);
      return res.status(404).json({ error: 'User not found' });
    }

    console.log('Current user state:', currentUser);

    // Update user's streak count
    console.log('Updating user streak:', {
      userId: user_id,
      currentStreak: currentUser.streak_count,
      newStreak: currentUser.streak_count + 5
    });

    const { data: user, error: userError } = await supabase
      .from('users')
      .update({ 
        streak_count: currentUser.streak_count + 5
      })
      .eq('id', user_id)
      .select()
      .single();
    
    if (userError) {
      console.error('Error updating user:', userError);
      throw userError;
    }

    console.log('Like operation successful:', {
      updatedPost,
      updatedUser: user
    });

    res.json({ post: updatedPost, streak_count: user.streak_count });
  } catch (error: any) {
    console.error('Like post error:', {
      error,
      message: error.message,
      details: error.details,
      hint: error.hint
    });
    res.status(500).json({ error: error.message });
  }
});

export default router; 