import { CoursePart } from '../types';
import { assertNever } from '../utils';

const Part = ({ part }: { part: CoursePart }): JSX.Element => {
  switch (part.type) {
    case 'normal':
      return (
        <p>
          <b>{part.name} {part.exerciseCount}</b>
          <br/>
          <i>{part.description}</i>
        </p>
      )
    case 'groupProject':
      return (
        <p>
          <b>{part.name} {part.exerciseCount}</b>
          <br/>
          project exercises {part.groupProjectCount}
        </p>
      )
    case 'submission':
      return (
        <p>
          <b>{part.name} {part.exerciseCount}</b>
          <br/>
          <i>{part.description}</i>
          <br/>
          submit to <i>{part.exerciseSubmissionLink}</i>
        </p>
      )
    case 'special':
      return (
        <p>
          <b>{part.name} {part.exerciseCount}</b>
          <br/>
          <i>{part.description}</i>
          <br/>
          required skills:
          <ul>
            {part.requirements.map(requirement => (
              <li key={part.name}>{requirement}</li>
            ))}
          </ul>
        </p>
      )
    default:
      return assertNever(part);
  }
}

export default Part;
