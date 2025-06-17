import express from 'express';
import OpenAI from 'openai';
import { supabase } from '../config/supabase';

const router = express.Router();

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

interface MatchingUsersRequest {
  matchingUsers: any[];
  currentUser: any;
}

// Helper function to fetch comprehensive user data
async function fetchComprehensiveUserData(userId: string) {
  try {
    // Fetch basic user data
    const { data: user, error: userError } = await supabase
      .from('users')
      .select('*')
      .eq('id', userId)
      .single();

    if (userError) throw userError;

    // Fetch user skills
    const { data: skills, error: skillsError } = await supabase
      .from('user_skills')
      .select('skill_name')
      .eq('user_id', userId);

    // Fetch user courses
    const { data: courses, error: coursesError } = await supabase
      .from('courses')
      .select('course_name')
      .eq('user_id', userId);

    // Fetch school history
    const { data: schoolHistory, error: schoolError } = await supabase
      .from('school_history')
      .select('school_name, degree, graduation_year')
      .eq('user_id', userId);

    // Fetch job history
    const { data: jobHistory, error: jobError } = await supabase
      .from('job_history')
      .select('job_id')
      .eq('user_id', userId);

    // Fetch job details for job history
    let jobDetails = [];
    if (jobHistory && jobHistory.length > 0) {
      const jobIds = jobHistory.map(jh => jh.job_id);
      const { data: jobs, error: jobsError } = await supabase
        .from('jobs')
        .select('*')
        .in('id', jobIds);
      
      if (!jobsError && jobs) {
        jobDetails = jobs;
      }
    }

    return {
      ...user,
      skills: skills?.map(s => s.skill_name) || [],
      courses: courses?.map(c => c.course_name).filter(Boolean) || [],
      schoolHistory: schoolHistory || [],
      jobHistory: jobDetails || [],
      // Add any other related data here
    };
  } catch (error) {
    console.error(`Error fetching comprehensive data for user ${userId}:`, error);
    return null;
  }
}

router.post('/process-matches', async (req, res) => {
  console.log('=== ChatGPT Route Called ===');
  console.log('Request body:', req.body);
  
  try {
    const { matchingUsers, currentUser }: MatchingUsersRequest = req.body;

    console.log('Extracted data:');
    console.log('- matchingUsers count:', matchingUsers?.length);
    console.log('- currentUser:', currentUser);

    if (!matchingUsers || !Array.isArray(matchingUsers)) {
      console.error('Invalid matchingUsers:', matchingUsers);
      return res.status(400).json({ error: 'matchingUsers must be an array' });
    }

    if (!currentUser) {
      console.error('Missing currentUser');
      return res.status(400).json({ error: 'currentUser is required' });
    }

    // Fetch comprehensive data for current user
    console.log('Fetching comprehensive data for current user...');
    const comprehensiveCurrentUser = await fetchComprehensiveUserData(currentUser.id);
    
    // Fetch comprehensive data for all matching users
    console.log('Fetching comprehensive data for matching users...');
    const comprehensiveMatchingUsers = [];
    for (const user of matchingUsers) {
      const comprehensiveUser = await fetchComprehensiveUserData(user.id);
      if (comprehensiveUser) {
        comprehensiveMatchingUsers.push(comprehensiveUser);
      }
    }

    // Format user profile data with ALL available information
    const userProfile = {
      // Basic user info
      id: comprehensiveCurrentUser?.id || currentUser.id,
      name: comprehensiveCurrentUser?.name || currentUser.name || 'Unknown',
      current_location: comprehensiveCurrentUser?.current_location || currentUser.current_location || 'Unknown',
      streak_count: comprehensiveCurrentUser?.streak_count || currentUser.streak_count || 0,
      created_at: comprehensiveCurrentUser?.created_at || currentUser.created_at,
      updated_at: comprehensiveCurrentUser?.updated_at || currentUser.updated_at,
      
      // Skills and education
      skills: comprehensiveCurrentUser?.skills || [],
      courses: comprehensiveCurrentUser?.courses || [],
      school_history: comprehensiveCurrentUser?.schoolHistory || [],
      
      // Job and professional info
      job_history: comprehensiveCurrentUser?.jobHistory || [],
      
      // Any other fields from the original user object
      ...currentUser
    };

    console.log('Formatted comprehensive user profile:', userProfile);

    // Format available people list with ALL available information
    const availablePeopleList = comprehensiveMatchingUsers.map(user => ({
      // Basic user info
      id: user.id,
      name: user.name || 'Unknown',
      current_location: user.current_location || 'Unknown',
      streak_count: user.streak_count || 0,
      created_at: user.created_at,
      updated_at: user.updated_at,
      
      // Skills and education
      skills: user.skills || [],
      courses: user.courses || [],
      school_history: user.schoolHistory || [],
      
      // Job and professional info
      job_history: user.jobHistory || [],
      
      // Any other fields from the original user object
      ...user
    }));

    console.log('Formatted comprehensive available people list:', availablePeopleList);

    // Create a prompt for ChatGPT to analyze the matching users
    const prompt = `You are an AI assistant helping to match LinkedIn users for professional networking and coffee chats.   
   
**TASK:** Analyze a target user and a list of potential matches to find the top 5 most compatible people for online networking/meeting, which will be returned as a JSON array.  
   
**INPUT DATA:**  
1. **Target User Profile:** ${JSON.stringify(userProfile, null, 2)}
   
2. **Available Candidates:** ${JSON.stringify(availablePeopleList, null, 2)}
   
**MATCHING CRITERIA (equally weighted, focus on professional and educational connections):**  
1. **Professional Alignment** - Same company, industry, similar job roles, or career interests
2. **Educational Background** - Same school, program, graduation timeframe, or academic interests  
3. **Skill Compatibility** - Overlapping professional skills, technical expertise, or interests
4. **Career Stage/Level** - Similar seniority, experience level, or career goals
5. **Geographic Proximity** - Same city, region, or nearby locations (lower priority)
   
**IMPORTANT:** Do NOT prioritize location over professional or educational connections. Focus on meaningful professional relationships and shared interests rather than just proximity.
   
**OUTPUT FORMAT:**  
Return the top 5 matches as a JSON array with this structure. DO NOT INCLUDE ANYTHING ELSE IN THE RESPONSE OTHER THAN JSON FORMATTED DATA:  
json  
[  
  {
    "name": "Person Name",  
    "match_score": 85,  
    "shared_traits": [  
      "Same industry: Both in Technology",  
      "Similar role: Both in Product Management",  
      "Shared skills: Data Analysis, User Research"  
    ],  
    "meeting_reason": "Great opportunity to discuss product strategy and share insights on user research methodologies."
  }  
]  

INSTRUCTIONS:
JSON format is required.
List 2-4 most relevant shared_traits per person (prioritize professional/educational over location),
Provide a short, concise, and compelling meeting_reason for each match
If fewer than 5 candidates exist, return all available matches
Prioritize quality professional connections over quantity
Return EXACTLY 5 matches maximum
JSON format is required.
`;

    console.log('Sending prompt to ChatGPT...');
    console.log('Prompt length:', prompt.length);

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "You are a helpful assistant for professional networking and coffee chat scheduling."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      max_tokens: 500,
      temperature: 0.7,
    });

    console.log('ChatGPT completion received:', completion);

    const analysis = completion.choices[0]?.message?.content || 'No analysis available';

    // Log the AI response
    console.log('=== ChatGPT Analysis Response ===');
    console.log(analysis);
    console.log('================================');

    const response = {
      success: true,
      analysis,
      matchingUsers,
      timestamp: new Date().toISOString()
    };

    console.log('Sending response to frontend:', response);
    res.json(response);

  } catch (error) {
    console.error('=== ERROR in ChatGPT Route ===');
    console.error('Error details:', error);
    console.error('Error message:', error instanceof Error ? error.message : 'Unknown error');
    console.error('Error stack:', error instanceof Error ? error.stack : 'No stack trace');
    
    res.status(500).json({ 
      error: 'Failed to process matches with ChatGPT',
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

// New endpoint for generating conversation starters
router.post('/generate-conversation-starter', async (req, res) => {
  console.log('=== Generate Conversation Starter Route Called ===');
  console.log('Request body:', req.body);
  
  try {
    const { currentUser, selectedUser, selectedTime, selectedDate, storedMatches } = req.body;

    if (!currentUser || !selectedUser) {
      return res.status(400).json({ error: 'currentUser and selectedUser are required' });
    }

    // Fetch comprehensive data for both users
    console.log('Fetching comprehensive data for conversation starter...');
    const comprehensiveCurrentUser = await fetchComprehensiveUserData(currentUser.id);
    const comprehensiveSelectedUser = await fetchComprehensiveUserData(selectedUser.id);

    // Find the specific match data for this user from stored matches
    let matchData = null;
    if (storedMatches && Array.isArray(storedMatches)) {
      matchData = storedMatches.find((match: any) => 
        match.userId === selectedUser.id || match.id === selectedUser.id
      );
    }

    console.log('Found match data:', matchData);

    // Create a prompt for generating conversation starters
    const prompt = `You are an AI assistant that crafts personalized LinkedIn networking messages. Generate a friendly, professional message from one user to another based on their shared availability and common traits.  
    
**TASK:** Create a concise, engaging LinkedIn message that feels natural and personalized.  
   
**INPUT DATA:**  
1. **Sender Profile:** ${JSON.stringify(comprehensiveCurrentUser, null, 2)}
   
2. **Recipient Profile:** ${JSON.stringify(comprehensiveSelectedUser, null, 2)}
   
3. **Shared Context:** 
   - Available time slot: ${selectedTime || 'TBD'} on ${selectedDate || 'TBD'}
   - Match analysis: ${matchData ? JSON.stringify(matchData, null, 2) : 'No match analysis available'}
   - Shared traits: ${matchData?.sharedTraits ? matchData.sharedTraits.join(', ') : 'Based on profiles'}
   - Meeting reason: ${matchData?.meetingReason || 'Professional networking'}
   
**MESSAGE GUIDELINES:**  
- Keep it 2-3 sentences, max 150 words  
- Start with time availability reference  
- Mention the shared connection/trait naturally  
- Include a specific conversation starter or meeting purpose  
- End with a clear, friendly call-to-action  
- Use casual but professional tone  
- Avoid overly formal language  
   
**OUTPUT FORMAT:**  
Return only the message text, ready to send.  
   
**EXAMPLE SCENARIOS:**  
- Mutual connections: "Hey [Name], I noticed we're both free Tuesday afternoon and have some mutual connections at [Company]. I'd love to chat about [relevant topic] - are you up for a quick coffee?"  
- Same company: "Hi [Name], saw we both have some free time this Thursday and work at [Company]. Haven't connected yet but would love to chat about [relevant project/department] - interested in grabbing lunch?"  
- Same school: "Hey [Name], noticed we're both free Wednesday evening and are [School] alums! Would love to connect with a fellow [mascot/program] and hear about your experience in [industry] - coffee sometime?"  
`;

    console.log('Sending conversation starter prompt to ChatGPT...');
    console.log('Prompt length:', prompt.length);

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "You are a helpful assistant for generating professional conversation starters for networking coffee chats."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      max_tokens: 150,
      temperature: 0.8,
    });

    console.log('ChatGPT conversation starter response received:', completion);

    const conversationStarter = completion.choices[0]?.message?.content || 'Hi! Looking forward to our coffee chat!';

    // Log the AI response
    console.log('=== Generated Conversation Starter ===');
    console.log(conversationStarter);
    console.log('=====================================');

    const response = {
      success: true,
      conversationStarter: conversationStarter.trim(),
      timestamp: new Date().toISOString()
    };

    console.log('Sending conversation starter to frontend:', response);
    res.json(response);

  } catch (error) {
    console.error('=== ERROR in Generate Conversation Starter Route ===');
    console.error('Error details:', error);
    console.error('Error message:', error instanceof Error ? error.message : 'Unknown error');
    console.error('Error stack:', error instanceof Error ? error.stack : 'No stack trace');
    
    res.status(500).json({ 
      error: 'Failed to generate conversation starter',
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

// New endpoint for generating DM conversation starters
router.post('/generate-dm-starter', async (req, res) => {
  console.log('=== Generate DM Starter Route Called ===');
  console.log('Request body:', req.body);
  
  try {
    const { currentUser, selectedUser, storedMatches } = req.body;

    if (!currentUser || !selectedUser) {
      return res.status(400).json({ error: 'currentUser and selectedUser are required' });
    }

    // Fetch comprehensive data for both users
    console.log('Fetching comprehensive data for DM starter...');
    const comprehensiveCurrentUser = await fetchComprehensiveUserData(currentUser.id);
    const comprehensiveSelectedUser = await fetchComprehensiveUserData(selectedUser.id);

    // Find the specific match data for this user from stored matches
    let matchData = null;
    if (storedMatches && Array.isArray(storedMatches)) {
      matchData = storedMatches.find((match: any) => 
        match.userId === selectedUser.id || match.id === selectedUser.id
      );
    }

    console.log('Found match data for DM:', matchData);

    // Create a prompt for generating DM conversation starters
    const prompt = `You are an AI assistant that crafts personalized LinkedIn direct messages for professional networking. Generate a friendly, professional DM that initiates a conversation.

**TASK:** Create a concise, engaging LinkedIn direct message that feels natural and personalized for initial contact.

**INPUT DATA:**  
1. **Sender Profile:** ${JSON.stringify(comprehensiveCurrentUser, null, 2)}
   
2. **Recipient Profile:** ${JSON.stringify(comprehensiveSelectedUser, null, 2)}
   
3. **Shared Context:** 
   - Match analysis: ${matchData ? JSON.stringify(matchData, null, 2) : 'No match analysis available'}
   - Shared traits: ${matchData?.sharedTraits ? matchData.sharedTraits.join(', ') : 'Based on profiles'}
   - Meeting reason: ${matchData?.meetingReason || 'Professional networking'}
   - Match score: ${matchData?.matchScore || 'High compatibility'}
   
**MESSAGE GUIDELINES:**  
- Keep it 2-3 sentences, max 120 words  
- Start with a personalized greeting  
- Mention specific shared interests, skills, or background  
- Include a clear purpose for connecting  
- End with a friendly call-to-action or question  
- Use casual but professional tone  
- Avoid overly formal language  
- Make it feel like a natural LinkedIn message
   
**OUTPUT FORMAT:**  
Return only the message text, ready to send as a DM.

**EXAMPLE SCENARIOS:**  
- Shared skills: "Hi [Name]! I noticed we both work with [specific technology/skill] and have similar backgrounds in [industry]. Would love to connect and hear about your experience at [Company] - your work on [specific project/area] looks really interesting!"
- Same school: "Hey [Name]! Fellow [School] alum here 👋 I saw your profile and was impressed by your journey from [School] to [current role]. Would love to connect and hear about your experience in [industry] - always great to meet fellow [mascot/program]!"
- Mutual interests: "Hi [Name]! I came across your profile and noticed we share an interest in [specific topic/technology]. Your experience in [area] caught my attention - would love to connect and potentially discuss [relevant topic] sometime!"
`;

    console.log('Sending DM starter prompt to ChatGPT...');
    console.log('Prompt length:', prompt.length);

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "You are a helpful assistant for generating professional LinkedIn direct messages for networking."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      max_tokens: 120,
      temperature: 0.8,
    });

    console.log('ChatGPT DM starter response received:', completion);

    const dmStarter = completion.choices[0]?.message?.content || 'Hi! I noticed we have similar interests and would love to connect!';

    // Log the AI response
    console.log('=== Generated DM Starter ===');
    console.log(dmStarter);
    console.log('===========================');

    const response = {
      success: true,
      dmStarter: dmStarter.trim(),
      timestamp: new Date().toISOString()
    };

    console.log('Sending DM starter to frontend:', response);
    res.json(response);

  } catch (error) {
    console.error('=== ERROR in Generate DM Starter Route ===');
    console.error('Error details:', error);
    console.error('Error message:', error instanceof Error ? error.message : 'Unknown error');
    console.error('Error stack:', error instanceof Error ? error.stack : 'No stack trace');
    
    res.status(500).json({ 
      error: 'Failed to generate DM starter',
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

export default router; 