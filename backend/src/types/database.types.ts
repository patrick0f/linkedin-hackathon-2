export type User = {
  id: string;
  name: string | null;
  current_location: string | null;
  connections: string[] | null;
  streak_count: number;
  time_avail: string[] | null;
  profile_pic: string | null;
};

export type Job = {
  id: string;
  company: string | null;
  location: string | null;
  position: string | null;
  industry: string | null;
  level: string | null;
};

export type Post = {
  id: string;
  user_id: string;
  post_text: string | null;
  pic_link: string | null;
  comments: any[] | null;
  num_of_likes: number;
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