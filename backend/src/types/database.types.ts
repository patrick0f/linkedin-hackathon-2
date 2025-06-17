export interface User {
  id: string;
  name: string;
  current_location?: string | null;
  created_at: string;
  updated_at: string;
  streak_count: number;
}

export interface Post {
  id: string;
  user_id: string;
  post_text: string | null;
  pic_link: string | null;
  comments: string[] | null;
  num_of_likes: number;
  pfp: string | null;
  user?: User;
}

export type Job = {
  id: string;
  company: string | null;
  location: string | null;
  position: string | null;
  industry: string | null;
  level: string | null;
};

export type Skill = {
  skill_name: string;
};

export type UserSkill = {
  user_id: string;
  skill_name: string;
};

export type Course = {
  user_id: string;
  course_name: string | null;
};

export type SchoolHistory = {
  user_id: string;
  school_name: string | null;
  degree: string | null;
  graduation_year: number | null;
};

export type JobHistory = {
  user_id: string;
  job_id: string;
}; 