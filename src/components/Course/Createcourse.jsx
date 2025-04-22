import { useState , useEffect } from 'react';
import axios from 'axios';
const CreateCourse = () => {
     const [courses, setCourses] = useState([]);
     const [showForm, setShowForm] = useState(false);
     const [courseData, setCourseData] = useState({
       title: '',
       classname: '',
       instructorName: '',
       description: '',
       coverImage: '',
       topics: [],
       topicInput: '',
       status: 'draft',
       category: 'General',
       prerequisites: [''],
       isFree: true,
       price: 0,
       estimatedDuration: 0,
     });
   
     const API_BASE = 'http://localhost:3000/api/course';
   
     // Fetch all courses
     const fetchCourses = async () => {
       try {
         const res = await axios.get(`${API_BASE}/all`);
          console.log(res)
         setCourses(res.data.data);
       } catch (error) {
         console.error('Failed to fetch courses:', error);
       }
     };
   
     useEffect(() => {
       fetchCourses();
     }, []);
   
     const handleChange = (e) => {
       const { name, value, type, checked } = e.target;
       setCourseData({
         ...courseData,
         [name]: type === 'checkbox' ? checked : value,
       });
     };
   
     const handleTopicChange = (e) => {
       setCourseData({ ...courseData, topicInput: e.target.value });
     };
   
     const addTopic = () => {
       if (courseData.topicInput.trim()) {
         setCourseData({
           ...courseData,
           topics: [...courseData.topics, courseData.topicInput.trim()],
           topicInput: '',
         });
       }
     };
   
     const removeTopic = (index) => {
       const updatedTopics = courseData.topics.filter((_, i) => i !== index);
       setCourseData({ ...courseData, topics: updatedTopics });
     };
   
     const handleSubmit = async (e) => {
       e.preventDefault();
       const { topicInput, ...finalData } = courseData;
       try {
         await axios.post(`${API_BASE}/create`, finalData);
         fetchCourses(); // refresh list
         setShowForm(false); // close form
         setCourseData({
           title: '',
           classname: '',
           instructorName: '',
           description: '',
           coverImage: '',
           topics: [],
           topicInput: '',
           status: 'draft',
           category: 'General',
           prerequisites: [''],
           isFree: true,
           price: 0,
           estimatedDuration: 0,
         });
       } catch (err) {
         console.error('Create course error:', err);
       }
     };
   
     return (
       <div className="p-6 bg-gray-100 min-h-screen">
         <div className="flex justify-between items-center mb-6">
           <h1 className="text-3xl font-bold">All Courses</h1>
           <button
             onClick={() => setShowForm(!showForm)}
             className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
           >
             {showForm ? 'Close Form' : 'Add Course'}
           </button>
         </div>
   
         {showForm && (
           <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4 bg-white p-6 rounded mb-10">
             <input type="text" name="title" value={courseData.title} onChange={handleChange} placeholder="Title" required className="p-2 border rounded" />
             <input type="text" name="classname" value={courseData.classname} onChange={handleChange} placeholder="Class Name" className="p-2 border rounded" />
             <input type="text" name="instructorName" value={courseData.instructorName} onChange={handleChange} placeholder="Instructor Name" required className="p-2 border rounded" />
             <textarea name="description" value={courseData.description} onChange={handleChange} placeholder="Description" required className="p-2 border rounded" />
             <input type="text" name="coverImage" value={courseData.coverImage} onChange={handleChange} placeholder="Cover Image URL" className="p-2 border rounded" />
   
             {/* Topics */}
             <div>
               <label className="block font-medium mb-1">Topics</label>
               <div className="flex gap-2">
                 <input type="text" value={courseData.topicInput} onChange={handleTopicChange} placeholder="Add topic" className="p-2 border rounded w-full" />
                 <button type="button" onClick={addTopic} className="bg-gray-700 text-white px-3 rounded">Add</button>
               </div>
               <div className="flex flex-wrap gap-2 mt-2">
                 {courseData.topics.map((topic, index) => (
                   <span key={index} className="bg-gray-200 px-3 py-1 rounded-full flex items-center gap-2">
                     {topic}
                     <button type="button" onClick={() => removeTopic(index)} className="text-red-500 font-bold">×</button>
                   </span>
                 ))}
               </div>
             </div>
   
             <select name="status" value={courseData.status} onChange={handleChange} className="p-2 border rounded">
               <option value="draft">Draft</option>
               <option value="published">Published</option>
             </select>
             <input type="text" name="category" value={courseData.category} onChange={handleChange} placeholder="Category" className="p-2 border rounded" />
             <input type="number" name="estimatedDuration" value={courseData.estimatedDuration} onChange={handleChange} placeholder="Estimated Duration" className="p-2 border rounded" />
             <label className="flex gap-2 items-center">
               <input type="checkbox" name="isFree" checked={courseData.isFree} onChange={handleChange} />
               Is Free?
             </label>
             {!courseData.isFree && (
               <input type="number" name="price" value={courseData.price} onChange={handleChange} placeholder="Price" className="p-2 border rounded" />
             )}
             <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">Submit Course</button>
           </form>
         )}
   
         {/* Courses List */}
         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
           {courses.map((course) => (
             <div key={course._id} className="bg-white shadow-md rounded-lg overflow-hidden">
               <img
                 src={course.coverImage || 'https://via.placeholder.com/400x200'}
                 alt={course.title}
                 className="w-full h-40 object-cover"
               />
               <div className="p-4">
                 <h3 className="text-xl font-bold mb-2">{course.title}</h3>
                 <p className="text-gray-600 text-sm mb-2">{course.instructorName}</p>
                 <p className="text-gray-700 text-sm line-clamp-3 mb-4">{course.description}</p>
                 <button
                   onClick={() => alert(`View details for ${course.title}`)}
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

export default CreateCourse;
