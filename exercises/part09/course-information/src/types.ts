interface PartBase {
  name: string;
  exerciseCount: number;
  type: string;
}

interface PartWithDescription extends PartBase {
  description: string;
}

interface NormalPart extends PartWithDescription {
  type: "normal";
}

interface ProjectPart extends PartBase {
  type: "groupProject";
  groupProjectCount: number;
}

interface SubmissionPart extends PartWithDescription {
  type: "submission";
  exerciseSubmissionLink: string;
}

interface RequirementsPart extends PartWithDescription {
  type: "special";
  requirements: Array<string>;
}

export type CoursePart = NormalPart | ProjectPart | SubmissionPart | RequirementsPart;
