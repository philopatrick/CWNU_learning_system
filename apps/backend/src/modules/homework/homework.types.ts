import type { Homework as SharedHomework, HomeworkSubmission as SharedHomeworkSubmission, CreateHomeworkRequest as SharedCreateHomeworkRequest, SubmitHomeworkRequest as SharedSubmitHomeworkRequest, GradeHomeworkRequest as SharedGradeHomeworkRequest } from "@cwnu/shared/homework";

export type Homework = SharedHomework;
export type HomeworkSubmission = SharedHomeworkSubmission;
export type CreateHomeworkRequest = SharedCreateHomeworkRequest;
export type SubmitHomeworkRequest = SharedSubmitHomeworkRequest;
export type GradeHomeworkRequest = SharedGradeHomeworkRequest;
