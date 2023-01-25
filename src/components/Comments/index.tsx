import Cookies from "js-cookie";
import React from "react";
import api from "../../services/api";

interface CommentsProps {
  courseId: number;
  lessonId: number;
}

export const Comments: React.FC<CommentsProps> = ({ courseId, lessonId }) => {
  const getQuestions = async () => {
    let endpoint = `/forum-questions`;
    endpoint += `?sort[0]=createdAt`;
    endpoint += `&populate[0]=user`;
    endpoint += `&populate[1]=forum_answers`;
    endpoint += `&populate[2]=forum_answers.user`;
    endpoint += `&filters[courses][id][$eq]=${courseId}`;
    endpoint += `&filters[lessons][id][$eq]=${lessonId}`;
    const course = await api.get(endpoint, {
      headers: { Authorization: `Bearer ${Cookies.get("Exsto_token")}` },
    });
    console.log(course.data.data);
  };

  React.useEffect(() => {
    getQuestions();
  }, [courseId, lessonId]);

  return (
    <p>
      {courseId}, {lessonId}
    </p>
  );
};
