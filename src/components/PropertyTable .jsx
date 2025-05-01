import { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const PropertyTable = () => {
  const [properties, setProperties] = useState([]);
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [rejectionReason, setRejectionReason] = useState('');

  useEffect(() => {
    fetchProperties();
  }, []);

  const fetchProperties = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/property/all');
      console.log(response)
      setProperties(response.data.data);
      setLoading(false);
    } catch (error) {
      toast.error('Failed to fetch properties');
      setLoading(false);
    }
  };

  const handleView = (property) => {
    setSelectedProperty(property);
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/properties/${id}`);
      toast.success('Property deleted successfully');
      fetchProperties();
    } catch (error) {
      toast.error('Failed to delete property');
    }
  };

  const handleApprove = async () => {
    try {
      await axios.put(`http://localhost:3000/api/property/${selectedProperty._id}/approve`);
      toast.success('Property approved successfully');
      setIsModalOpen(false);
      fetchProperties();
    } catch (error) {
      toast.error('Failed to approve property');
    }
  };

  const handleReject = async () => {
    if (!rejectionReason) {
      toast.error('Please provide a rejection reason');
      return;
    }

    try {
      await axios.put(`http://localhost:3000/api/property/${selectedProperty._id}/reject`, {
        rejectionReason
      });
      toast.success('Property rejected successfully');
      setIsModalOpen(false);
      setRejectionReason('');
      fetchProperties();
    } catch (error) {
      toast.error('Failed to reject property');
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString();
  };

  if (loading) {
    return <div className="flex justify-center items-center h-64">Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Property Management</h1>
      
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Property Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Address</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Created At</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Seller Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {properties.map((property) => (
              <tr key={property._id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{property.propertyName}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{property.address}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{formatDate(property.createdAt)}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                    ${property.status === 'approved' ? 'bg-green-100 text-green-800' : 
                      property.status === 'rejected' ? 'bg-red-100 text-red-800' : 
                      'bg-yellow-100 text-yellow-800'}`}>
                    {property.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{property.sellerName}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{property.contactDetails.phone}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  {property.status === 'pending' ? (
                    <button
                      onClick={() => handleView(property)}
                      className="text-indigo-600 hover:text-indigo-900 mr-3"
                    >
                      View
                    </button>
                  ) : (
                    <button
                      onClick={() => handleDelete(property._id)}
                      className="text-red-600 hover:text-red-900"
                    >
                      Delete
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Property Details Modal */}
      {isModalOpen && selectedProperty && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-start">
                <h2 className="text-xl font-bold mb-4">{selectedProperty.propertyName}</h2>
                <button 
                  onClick={() => setIsModalOpen(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                  </svg>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div>
                  <h3 className="font-semibold text-gray-700">Address:</h3>
                  <p className="text-gray-600">{selectedProperty.address}</p>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-700">Location:</h3>
                  <p className="text-gray-600">{selectedProperty.city}, {selectedProperty.state}</p>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-700">Price:</h3>
                  <p className="text-gray-600">${selectedProperty.price.toLocaleString()}</p>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-700">Area:</h3>
                  <p className="text-gray-600">{selectedProperty.area} sq.ft</p>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-700">Seller:</h3>
                  <p className="text-gray-600">{selectedProperty.sellerName}</p>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-700">Contact:</h3>
                  <p className="text-gray-600">{selectedProperty.contactDetails.phone}<br/>{selectedProperty.contactDetails.email}</p>
                </div>
              </div>

              <div className="mb-6">
                <h3 className="font-semibold text-gray-700">Features:</h3>
                <div className="flex flex-wrap gap-2 mt-2">
                  {selectedProperty.features.map((feature, index) => (
                    <span key={index} className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                      {feature}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mb-6">
                <h3 className="font-semibold text-gray-700">Description:</h3>
                <p className="text-gray-600 mt-2">{selectedProperty.description}</p>
              </div>

              {selectedProperty.images && selectedProperty.images.length > 0 && (
                <div className="mb-6">
                  <h3 className="font-semibold text-gray-700">Images:</h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-2">
                    {selectedProperty.images.map((image, index) => (
                      <img 
                        key={index} 
                        src={image} 
                        alt={`Property ${index + 1}`} 
                        className="rounded-lg object-cover h-32 w-full"
                      />
                    ))}
                  </div>
                </div>
              )}

              {selectedProperty.status === 'pending' && (
                <div className="flex flex-col space-y-4 md:flex-row md:space-y-0 md:space-x-4">
                  <button
                    onClick={handleApprove}
                    className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md flex-1"
                  >
                    Approve Property
                  </button>
                  <div className="flex-1">
                    <textarea
                      value={rejectionReason}
                      onChange={(e) => setRejectionReason(e.target.value)}
                      placeholder="Enter rejection reason..."
                      className="w-full border border-gray-300 rounded-md p-2 mb-2"
                      rows="2"
                    />
                    <button
                      onClick={handleReject}
                      className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md w-full"
                    >
                      Reject Property
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PropertyTable;