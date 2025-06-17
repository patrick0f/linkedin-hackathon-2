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

export default router; 