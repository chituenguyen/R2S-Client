import { FaStar } from "react-icons/fa";
import { CiHeart, CiStar} from "react-icons/ci";
  
  const Rating = ({ rate }: { rate: number }) => {
    const filledStars = Math.round(rate);
    const emptyStars = 5 - filledStars;
  
    const stars = [];
    for (let i = 0; i < filledStars; i++) {
      stars.push(<FaStar key={`filled-${i}`} className="text-yellow-500" />);
    }
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<CiStar key={`empty-${i}`} />);
    }
  
    return (
      <div className="flex items-center">
        {stars}
      </div>
    );
  };

  export default Rating;

