import { ObjectId } from "mongodb";
import { getCollection } from "../../platform/mongodb/client.js";
import type { UserProfile, StudentProfile, TeacherProfile, AdminProfile } from "./users.types.js";

interface UserDocument {
  _id?: ObjectId;
  id: string;
  role: "student" | "teacher" | "admin";
  status: "active" | "pending" | "suspended";
  fullName: string;
  email: string;
  passwordHash: string;
  avatarUrl?: string;
  phone?: string;
  bio?: string;
  department?: string;
  studentNumber?: string;
  program?: string;
  gradeLevel?: string;
  nationality?: string;
  staffNumber?: string;
  title?: string;
  office?: string;
  permissions?: string[];
  createdAt: Date;
  updatedAt: Date;
}

export class UsersRepository {
  private readonly collection = getCollection<UserDocument>("users");

  async findById(id: string): Promise<UserProfile | undefined> {
    const doc = await this.collection.findOne({ id });
    if (!doc) return undefined;
    return this.toUserProfile(doc);
  }

  async findByEmail(email: string): Promise<UserProfile | undefined> {
    const doc = await this.collection.findOne({ email });
    if (!doc) return undefined;
    return this.toUserProfile(doc);
  }

  async findAll(): Promise<UserProfile[]> {
    const docs = await this.collection.find({}).toArray();
    return docs.map((doc) => this.toUserProfile(doc));
  }

  async save(profile: UserProfile): Promise<UserProfile> {
    const now = new Date();
    const doc: UserDocument = {
      id: profile.id,
      role: profile.role,
      status: profile.status,
      fullName: profile.fullName,
      email: profile.email,
      passwordHash: "",
      avatarUrl: profile.avatarUrl,
      phone: profile.phone,
      bio: profile.bio,
      createdAt: now,
      updatedAt: now
    };

    if (profile.role === "student") {
      const student = profile as StudentProfile;
      doc.studentNumber = student.studentNumber;
      doc.program = student.program;
      doc.gradeLevel = student.gradeLevel;
      doc.nationality = student.nationality;
    } else if (profile.role === "teacher") {
      const teacher = profile as TeacherProfile;
      doc.staffNumber = teacher.staffNumber;
      doc.title = teacher.title;
      doc.office = teacher.office;
    } else if (profile.role === "admin") {
      const admin = profile as AdminProfile;
      doc.permissions = admin.permissions;
    }

    await this.collection.updateOne({ id: profile.id }, { $set: doc }, { upsert: true });
    return profile;
  }

  async saveWithPassword(profile: UserProfile, passwordHash: string): Promise<UserProfile> {
    const now = new Date();
    const doc: UserDocument = {
      id: profile.id,
      role: profile.role,
      status: profile.status,
      fullName: profile.fullName,
      email: profile.email,
      passwordHash,
      avatarUrl: profile.avatarUrl,
      phone: profile.phone,
      bio: profile.bio,
      createdAt: now,
      updatedAt: now
    };

    if (profile.role === "student") {
      const student = profile as StudentProfile;
      doc.studentNumber = student.studentNumber;
      doc.program = student.program;
      doc.gradeLevel = student.gradeLevel;
      doc.nationality = student.nationality;
    } else if (profile.role === "teacher") {
      const teacher = profile as TeacherProfile;
      doc.staffNumber = teacher.staffNumber;
      doc.title = teacher.title;
      doc.office = teacher.office;
    } else if (profile.role === "admin") {
      const admin = profile as AdminProfile;
      doc.permissions = admin.permissions;
    }

    await this.collection.updateOne({ id: profile.id }, { $set: doc }, { upsert: true });
    return profile;
  }

  private toUserProfile(doc: UserDocument): UserProfile {
    const base = {
      id: doc.id,
      role: doc.role,
      status: doc.status,
      fullName: doc.fullName,
      email: doc.email,
      avatarUrl: doc.avatarUrl,
      phone: doc.phone,
      bio: doc.bio,
      department: doc.department
    };

    if (doc.role === "student") {
      return {
        ...base,
        role: "student",
        studentNumber: doc.studentNumber!,
        program: doc.program,
        gradeLevel: doc.gradeLevel,
        nationality: doc.nationality
      } as StudentProfile;
    }

    if (doc.role === "teacher") {
      return {
        ...base,
        role: "teacher",
        staffNumber: doc.staffNumber!,
        title: doc.title,
        office: doc.office
      } as TeacherProfile;
    }

    return {
      ...base,
      role: "admin",
      permissions: doc.permissions ?? []
    } as AdminProfile;
  }
}
