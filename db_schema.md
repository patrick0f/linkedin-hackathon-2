All tables are based off of 3 linkedin-provided JSON files with additional attributes

## `users`

-   `id`:  `text`  —  **Primary Key**, not null
    
-   `name`:  `text`  — user’s full name
    
-   `current_location`:  `text`  — user’s current city or region
    
-   `connections`:  `text[]`  — array of user IDs representing their connections
    
-   `streak_count`:  `smallint`  — also represents points  (default = 0)
    
-   `time_avail`:  `real[]`  — array of available times (e.g., schedule slots)
    
-   `profile_pic`:  `text`  — URL of the user’s profile picture
    
----------

##   `skills`

-   `skill_name`:  `text`  —  **Primary Key**, name of the skill (e.g., Java, SQL)
    
----------

##  `user_skills`

-   `user_id`:  `text`  — Foreign Key →  `users.id`
    
-   `skill_name`:  `text`  — Foreign Key →  `skills.skill_name`
    

----------

##  `school_history`

-   `user_id`:  `text`  — Foreign Key →  `users.id`
    
-   `school_name`:  `text`  — name of the educational institution
    
-   `degree`:  `text`  — degree earned (e.g., BSc, MBA)
    
-   `graduation_year`:  `integer`  — year of graduation
    

----------

## `posts_activity`

-   `id`:  `uuid`  —  **Primary Key**, auto-generated post ID
    
-   `user_id`:  `text`  — Foreign Key →  `users.id`, not null
    
-   `post_text`:  `text`  — content of the post
    
-   `pic_link`:  `text`  — optional image or media link
    
-   `comments`:  `text[]`  — array of comment strings
    
-   `num_of_likes`:  `smallint`  — number of likes (default = 0)
    
-   `pfp`:  `text`  — profile picture used in post (can differ from main)
    

----------

## `jobs`

-   `id`:  `text`  —  **Primary Key**, job identifier
    
-   `company`:  `text`  — name of the company
    
-   `location`:  `text`  — job location (e.g., city, remote)
    
-   `position`:  `text`  — job title or role
    
-   `industry`:  `text`  — industry (e.g., Tech, Finance)
    
-   `level`:  `text`  — role level (e.g., Intern, Manager)
    

----------

##  `job_history`

-   `user_id`:  `text`  — Foreign Key →  `users.id`
    
-   `job_id`:  `text`  — Foreign Key →  `jobs.id`
    

----------

##   `courses`

-   `user_id`:  `text`  — Foreign Key →  `users.id`
    
-   `course_name`:  `text`  — name of the  course
