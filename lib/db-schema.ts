// This file defines the database schema for the AI Tutoring & Classroom Hub
// It's using TypeScript types to document the schema structure

// User Types
export type UserRole = "student" | "teacher" | "admin"

export interface User {
  id: string
  email: string
  name: string
  role: UserRole
  avatarUrl?: string
  gradeLevel?: number // For students
  createdAt: Date
  updatedAt: Date
}

// Subscription and Billing
export type SubscriptionPlan = "free" | "bronze" | "silver" | "gold"

export interface Subscription {
  id: string
  userId: string
  plan: SubscriptionPlan
  status: "active" | "canceled" | "past_due" | "trialing"
  currentPeriodStart: Date
  currentPeriodEnd: Date
  cancelAtPeriodEnd: boolean
  stripeCustomerId?: string
  stripeSubscriptionId?: string
  createdAt: Date
  updatedAt: Date
}

export interface TokenUsage {
  id: string
  userId: string
  subscriptionId: string
  tokensUsed: number
  tokensRemaining: number
  resetDate: Date
  createdAt: Date
  updatedAt: Date
}

export interface Invoice {
  id: string
  userId: string
  subscriptionId: string
  amount: number
  status: "paid" | "open" | "void" | "uncollectible"
  paidAt?: Date
  stripeInvoiceId?: string
  createdAt: Date
}

// Educational Content
export interface Subject {
  id: string
  name: string
  description?: string
  gradeLevel: number[]
  createdAt: Date
  updatedAt: Date
}

export interface Topic {
  id: string
  subjectId: string
  name: string
  description?: string
  createdAt: Date
  updatedAt: Date
}

// Tutoring Sessions
export type SessionType = "text" | "image" | "voice" | "file"
export type SessionStatus = "active" | "completed" | "saved"

export interface TutoringSession {
  id: string
  userId: string
  subjectId?: string
  topicId?: string
  title: string
  type: SessionType
  status: SessionStatus
  tokensUsed: number
  createdAt: Date
  updatedAt: Date
}

export interface SessionMessage {
  id: string
  sessionId: string
  role: "user" | "system"
  content: string
  mediaUrl?: string
  mediaType?: string
  createdAt: Date
}

export interface SessionFeedback {
  id: string
  sessionId: string
  messageId?: string
  rating: number // 1-5
  feedback?: string
  createdAt: Date
}

// Practice and Assessments
export type QuestionType = "multiple_choice" | "true_false" | "short_answer" | "essay" | "problem_solving"

export interface PracticeQuestion {
  id: string
  topicId: string
  type: QuestionType
  difficulty: "easy" | "medium" | "hard"
  question: string
  options?: string[] // For multiple choice
  answer: string
  explanation?: string
  createdAt: Date
  updatedAt: Date
}

export interface Assessment {
  id: string
  teacherId: string
  title: string
  description?: string
  subjectId: string
  topicIds: string[]
  dueDate?: Date
  isPublished: boolean
  createdAt: Date
  updatedAt: Date
}

export interface AssessmentQuestion {
  id: string
  assessmentId: string
  questionId: string // References PracticeQuestion
  points: number
  order: number
}

export interface StudentAssessment {
  id: string
  assessmentId: string
  studentId: string
  status: "assigned" | "in_progress" | "completed" | "graded"
  score?: number
  startedAt?: Date
  submittedAt?: Date
  createdAt: Date
  updatedAt: Date
}

export interface StudentAnswer {
  id: string
  studentAssessmentId: string
  questionId: string
  answer: string
  isCorrect?: boolean
  points?: number
  createdAt: Date
  updatedAt: Date
}

// Classroom Management
export interface Class {
  id: string
  teacherId: string
  name: string
  description?: string
  gradeLevel: number
  subject: string
  roomNumber?: string
  schedule?: string
  createdAt: Date
  updatedAt: Date
}

export interface ClassEnrollment {
  id: string
  classId: string
  studentId: string
  status: "active" | "inactive" | "pending"
  joinedAt: Date
  createdAt: Date
  updatedAt: Date
}

// Analytics and Progress Tracking
export interface StudentProgress {
  id: string
  studentId: string
  subjectId: string
  topicId: string
  proficiencyLevel: "beginner" | "intermediate" | "advanced" | "mastery"
  sessionsCompleted: number
  questionsAnswered: number
  correctAnswers: number
  lastActivityAt: Date
  createdAt: Date
  updatedAt: Date
}

export interface LearningStreak {
  id: string
  userId: string
  currentStreak: number
  longestStreak: number
  lastActivityDate: Date
  updatedAt: Date
}
