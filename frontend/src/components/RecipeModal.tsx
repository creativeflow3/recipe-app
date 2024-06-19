import { useEffect, useState } from 'react';
import { RecipeSummary } from '../types';
import { getRecipeSummary } from '../api';

type Props = {
  recipeId: string;
  onClose: () => void;
};

const RecipeModal = ({ recipeId, onClose }: Props) => {
  const [recipeSummary, setRecipeSummary] = useState<RecipeSummary>({
    id: '',
    summary: '',
    title: '',
  });

  useEffect(() => {
    const fetchRecipeSummary = async () => {
      try {
        const summaryRecipe = await getRecipeSummary(recipeId);
        setRecipeSummary(summaryRecipe);
      } catch (e) {
        console.log(e);
      }
    };
    fetchRecipeSummary();
    return () => {
      setRecipeSummary({
        id: '',
        summary: '',
        title: '',
      });
    };
  }, [recipeId]);

  if (!recipeSummary) {
    return <></>;
  }

  return (
    <>
      <div className="overlay" onClick={onClose}></div>
      <div className="modal">
        <div className="modal-content">
          <div className="modal-header">
            <h2>{recipeSummary.title}</h2>
            <span className="modal-close" onClick={onClose}>
              &times;
            </span>
          </div>
          <p dangerouslySetInnerHTML={{ __html: recipeSummary.summary }}></p>
        </div>
      </div>
    </>
  );
};

export default RecipeModal;
