export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[]

export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string
          auth_id: string
          email: string
          name: string
          role: "student" | "teacher" | "admin"
          avatar_url: string | null
          grade_level: number | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          auth_id: string
          email: string
          name: string
          role: "student" | "teacher" | "admin"
          avatar_url?: string | null
          grade_level?: number | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          auth_id?: string
          email?: string
          name?: string
          role?: "student" | "teacher" | "admin"
          avatar_url?: string | null
          grade_level?: number | null
          created_at?: string
          updated_at?: string
        }
      }
      students: {
        Row: {
          user_id: string
          grade_level: number | null
          school: string | null
          parent_email: string | null
          learning_goals: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          user_id: string
          grade_level?: number | null
          school?: string | null
          parent_email?: string | null
          learning_goals?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          user_id?: string
          grade_level?: number | null
          school?: string | null
          parent_email?: string | null
          learning_goals?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      teachers: {
        Row: {
          user_id: string
          subjects: string[] | null
          bio: string | null
          education: string | null
          years_experience: number | null
          created_at: string
          updated_at: string
        }
        Insert: {
          user_id: string
          subjects?: string[] | null
          bio?: string | null
          education?: string | null
          years_experience?: number | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          user_id?: string
          subjects?: string[] | null
          bio?: string | null
          education?: string | null
          years_experience?: number | null
          created_at?: string
          updated_at?: string
        }
      }
      subscriptions: {
        Row: {
          id: string
          user_id: string
          plan: "free" | "bronze" | "silver" | "gold"
          status: "active" | "canceled" | "past_due" | "trialing"
          current_period_start: string
          current_period_end: string
          cancel_at_period_end: boolean
          stripe_customer_id: string | null
          stripe_subscription_id: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          plan: "free" | "bronze" | "silver" | "gold"
          status: "active" | "canceled" | "past_due" | "trialing"
          current_period_start: string
          current_period_end: string
          cancel_at_period_end?: boolean
          stripe_customer_id?: string | null
          stripe_subscription_id?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          plan?: "free" | "bronze" | "silver" | "gold"
          status?: "active" | "canceled" | "past_due" | "trialing"
          current_period_start?: string
          current_period_end?: string
          cancel_at_period_end?: boolean
          stripe_customer_id?: string | null
          stripe_subscription_id?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      token_usage: {
        Row: {
          id: string
          user_id: string
          subscription_id: string | null
          tokens_used: number
          tokens_remaining: number
          reset_date: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          subscription_id?: string | null
          tokens_used?: number
          tokens_remaining?: number
          reset_date?: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          subscription_id?: string | null
          tokens_used?: number
          tokens_remaining?: number
          reset_date?: string
          created_at?: string
          updated_at?: string
        }
      }
      invoices: {
        Row: {
          id: string
          user_id: string
          subscription_id: string
          amount: number
          status: "paid" | "open" | "void" | "uncollectible"
          paid_at: string | null
          stripe_invoice_id: string | null
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          subscription_id: string
          amount: number
          status: "paid" | "open" | "void" | "uncollectible"
          paid_at?: string | null
          stripe_invoice_id?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          subscription_id?: string
          amount?: number
          status?: "paid" | "open" | "void" | "uncollectible"
          paid_at?: string | null
          stripe_invoice_id?: string | null
          created_at?: string
        }
      }
      subjects: {
        Row: {
          id: string
          name: string
          description: string | null
          grade_level: number[]
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          description?: string | null
          grade_level: number[]
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          description?: string | null
          grade_level?: number[]
          created_at?: string
          updated_at?: string
        }
      }
      topics: {
        Row: {
          id: string
          subject_id: string
          name: string
          description: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          subject_id: string
          name: string
          description?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          subject_id?: string
          name?: string
          description?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      tutoring_sessions: {
        Row: {
          id: string
          user_id: string
          subject_id: string | null
          topic_id: string | null
          title: string
          type: "text" | "image" | "voice" | "file"
          status: "active" | "completed" | "saved"
          tokens_used: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          subject_id?: string | null
          topic_id?: string | null
          title: string
          type: "text" | "image" | "voice" | "file"
          status: "active" | "completed" | "saved"
          tokens_used?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          subject_id?: string | null
          topic_id?: string | null
          title?: string
          type?: "text" | "image" | "voice" | "file"
          status?: "active" | "completed" | "saved"
          tokens_used?: number
          created_at?: string
          updated_at?: string
        }
      }
      session_messages: {
        Row: {
          id: string
          session_id: string
          role: "user" | "system"
          content: string
          media_url: string | null
          media_type: string | null
          created_at: string
        }
        Insert: {
          id?: string
          session_id: string
          role: "user" | "system"
          content: string
          media_url?: string | null
          media_type?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          session_id?: string
          role?: "user" | "system"
          content?: string
          media_url?: string | null
          media_type?: string | null
          created_at?: string
        }
      }
      session_feedback: {
        Row: {
          id: string
          session_id: string
          message_id: string | null
          rating: number
          feedback: string | null
          created_at: string
        }
        Insert: {
          id?: string
          session_id: string
          message_id?: string | null
          rating: number
          feedback?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          session_id?: string
          message_id?: string | null
          rating?: number
          feedback?: string | null
          created_at?: string
        }
      }
      practice_questions: {
        Row: {
          id: string
          topic_id: string
          type: "multiple_choice" | "true_false" | "short_answer" | "essay" | "problem_solving"
          difficulty: "easy" | "medium" | "hard"
          question: string
          options: Json | null
          answer: string
          explanation: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          topic_id: string
          type: "multiple_choice" | "true_false" | "short_answer" | "essay" | "problem_solving"
          difficulty: "easy" | "medium" | "hard"
          question: string
          options?: Json | null
          answer: string
          explanation?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          topic_id?: string
          type?: "multiple_choice" | "true_false" | "short_answer" | "essay" | "problem_solving"
          difficulty?: "easy" | "medium" | "hard"
          question?: string
          options?: Json | null
          answer?: string
          explanation?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      assessments: {
        Row: {
          id: string
          teacher_id: string
          title: string
          description: string | null
          subject_id: string
          topic_ids: string[]
          due_date: string | null
          is_published: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          teacher_id: string
          title: string
          description?: string | null
          subject_id: string
          topic_ids: string[]
          due_date?: string | null
          is_published?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          teacher_id?: string
          title?: string
          description?: string | null
          subject_id?: string
          topic_ids?: string[]
          due_date?: string | null
          is_published?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      assessment_questions: {
        Row: {
          id: string
          assessment_id: string
          question_id: string
          points: number
          order: number
        }
        Insert: {
          id?: string
          assessment_id: string
          question_id: string
          points?: number
          order: number
        }
        Update: {
          id?: string
          assessment_id?: string
          question_id?: string
          points?: number
          order?: number
        }
      }
      student_assessments: {
        Row: {
          id: string
          assessment_id: string
          student_id: string
          status: "assigned" | "in_progress" | "completed" | "graded"
          score: number | null
          started_at: string | null
          submitted_at: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          assessment_id: string
          student_id: string
          status: "assigned" | "in_progress" | "completed" | "graded"
          score?: number | null
          started_at?: string | null
          submitted_at?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          assessment_id?: string
          student_id?: string
          status?: "assigned" | "in_progress" | "completed" | "graded"
          score?: number | null
          started_at?: string | null
          submitted_at?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      student_answers: {
        Row: {
          id: string
          student_assessment_id: string
          question_id: string
          answer: string
          is_correct: boolean | null
          points: number | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          student_assessment_id: string
          question_id: string
          answer: string
          is_correct?: boolean | null
          points?: number | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          student_assessment_id?: string
          question_id?: string
          answer?: string
          is_correct?: boolean | null
          points?: number | null
          created_at?: string
          updated_at?: string
        }
      }
      classes: {
        Row: {
          id: string
          teacher_id: string
          name: string
          description: string | null
          grade_level: number
          subject: string
          room_number: string | null
          schedule: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          teacher_id: string
          name: string
          description?: string | null
          grade_level: number
          subject: string
          room_number?: string | null
          schedule?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          teacher_id?: string
          name?: string
          description?: string | null
          grade_level?: number
          subject?: string
          room_number?: string | null
          schedule?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      class_enrollments: {
        Row: {
          id: string
          class_id: string
          student_id: string
          status: "active" | "inactive" | "pending"
          joined_at: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          class_id: string
          student_id: string
          status: "active" | "inactive" | "pending"
          joined_at: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          class_id?: string
          student_id?: string
          status?: "active" | "inactive" | "pending"
          joined_at?: string
          created_at?: string
          updated_at?: string
        }
      }
      student_progress: {
        Row: {
          id: string
          student_id: string
          subject_id: string
          topic_id: string
          proficiency_level: "beginner" | "intermediate" | "advanced" | "mastery"
          sessions_completed: number
          questions_answered: number
          correct_answers: number
          last_activity_at: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          student_id: string
          subject_id: string
          topic_id: string
          proficiency_level: "beginner" | "intermediate" | "advanced" | "mastery"
          sessions_completed?: number
          questions_answered?: number
          correct_answers?: number
          last_activity_at: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          student_id?: string
          subject_id?: string
          topic_id?: string
          proficiency_level?: "beginner" | "intermediate" | "advanced" | "mastery"
          sessions_completed?: number
          questions_answered?: number
          correct_answers?: number
          last_activity_at?: string
          created_at?: string
          updated_at?: string
        }
      }
      learning_streaks: {
        Row: {
          id: string
          user_id: string
          current_streak: number
          longest_streak: number
          last_activity_date: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          current_streak?: number
          longest_streak?: number
          last_activity_date: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          current_streak?: number
          longest_streak?: number
          last_activity_date?: string
          updated_at?: string
        }
      }
      files: {
        Row: {
          id: string
          user_id: string
          name: string
          path: string
          size: number
          type: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          name: string
          path: string
          size: number
          type: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          name?: string
          path?: string
          size?: number
          type?: string
          created_at?: string
          updated_at?: string
        }
      }
      notifications: {
        Row: {
          id: string
          user_id: string
          title: string
          message: string
          type: string
          read: boolean
          action_url: string | null
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          title: string
          message: string
          type: string
          read?: boolean
          action_url?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          title?: string
          message?: string
          type?: string
          read?: boolean
          action_url?: string | null
          created_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}
