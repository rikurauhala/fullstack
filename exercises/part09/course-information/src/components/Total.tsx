import { Part } from '../types';

const Total = ({ courseParts }: { courseParts: Array<Part> }): JSX.Element => {
  return (
    <div>
      <p>
        Number of exercises{" "}
        {courseParts.reduce((carry, part) => carry + part.exerciseCount, 0)}
      </p>
    </div>
  )
}

export default Total;
