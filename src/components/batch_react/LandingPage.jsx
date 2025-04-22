const LandingPage = () => {
     return (
       <div className="flex flex-col min-h-screen bg-gray-100">
         {/* Hero Section */}
         <section className="flex gap-28 items-center justify-center min-h-screen bg-sky-100-500 text-black px-4">
           <div className="text-center mb-8">
             <h1 className="text-4xl font-bold">Welcome to Our Platform</h1>
             <p className="mt-2 text-lg">Login to access exclusive features</p>
           </div>
           <div className="bg-white p-6 rounded-lg shadow-lg text-black w-full max-w-sm">
             <h2 className="text-2xl font-semibold mb-4 text-center">Login</h2>
             <form className="space-y-4">
               <input
                 type="email"
                 placeholder="Email"
                 className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
               />
               <input
                 type="password"
                 placeholder="Password"
                 className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
               />
               <button className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition">
                 Login
               </button>
             </form>
           </div>
         </section>
   
         {/* Services Section */}
         <section className="py-16 bg-white text-center">
           <h2 className="text-3xl font-bold mb-6">Our Services</h2>
           <div className="grid grid-cols-1 md:grid-cols-3 gap-6 px-6">
             <div className="bg-gray-200 p-6 rounded-lg shadow-lg">
               <h3 className="text-xl font-semibold">Service 1</h3>
               <p className="mt-2">Description of Service 1</p>
             </div>
             <div className="bg-gray-200 p-6 rounded-lg shadow-lg">
               <h3 className="text-xl font-semibold">Service 2</h3>
               <p className="mt-2">Description of Service 2</p>
             </div>
             <div className="bg-gray-200 p-6 rounded-lg shadow-lg">
               <h3 className="text-xl font-semibold">Service 3</h3>
               <p className="mt-2">Description of Service 3</p>
             </div>
           </div>
         </section>
   
         {/* Footer Section */}
         <footer className="bg-gray-800 text-white text-center py-4">
           <p>&copy; 2025 Your Company. All rights reserved.</p>
         </footer>
       </div>
     );
   };
   
   export default LandingPage;
   