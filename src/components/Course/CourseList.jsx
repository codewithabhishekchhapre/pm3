import { useEffect, useState } from 'react';

const CourseList = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  // Replace with your backend endpoint
  const API_URL = 'http://localhost:5000/api/courses';

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await fetch(API_URL);
        const data = await res.json();
        setCourses(data);
      } catch (error) {
        console.error('Failed to fetch courses:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  if (loading) {
    return <div className="text-center mt-10 text-lg">Loading courses...</div>;
  }

  return (
    <div className="p-6">
      <h2 className="text-3xl font-semibold mb-6">All Courses</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {courses.map((course) => (
          <div
            key={course._id}
            className="bg-white shadow-md rounded-lg overflow-hidden"
          >
            <img
              src={course.coverImage || 'https://via.placeholder.com/400x200'}
              alt={course.title}
              className="w-full h-40 object-cover"
            />
            <div className="p-4">
              <h3 className="text-xl font-bold mb-2">{course.title}</h3>
              <p className="text-gray-600 text-sm mb-2">{course.instructorName}</p>
              <p className="text-gray-700 text-sm line-clamp-3 mb-4">
                {course.description}
              </p>
              <button
                onClick={() => alert(`Course ID: ${course._id}`)} // Replace this with route navigation if needed
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 text-sm"
              >
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CourseList;
