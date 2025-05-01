import axios from 'axios';
import { useEffect, useState } from 'react';
import { FiChevronLeft, FiChevronRight, FiX } from 'react-icons/fi';

const PropertyListing = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [properties, setProperties] = useState([]);
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const backendUrl = import.meta.env.VITE_BACKEND_IMG_URL;

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const response = await axios('http://localhost:3000/api/property/approve');
        setProperties(response.data.data);
      } catch (error) {
        console.error('Error fetching properties:', error);
      }
    };

    fetchProperties();
  }, []);

  // Open modal with selected property and reset image index
  const openImageModal = (property, index = 0) => {
    setSelectedProperty(property);
    setCurrentImageIndex(index);
  };

  // Close modal
  const closeImageModal = () => {
    setSelectedProperty(null);
    setCurrentImageIndex(0);
  };

  // Navigate between images in modal
  const navigateImage = (direction) => {
    if (direction === 'prev') {
      setCurrentImageIndex(prev => 
        prev === 0 ? selectedProperty.images.length - 1 : prev - 1
      );
    } else {
      setCurrentImageIndex(prev => 
        prev === selectedProperty.images.length - 1 ? 0 : prev + 1
      );
    }
  };

  // Filter approved properties and apply search filter
  const approvedProperties = properties.filter(property =>
    property.status === 'approved' &&
    property.propertyName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Approved Properties</h1>

      {/* Search Bar */}
      <div className="mb-8">
        <input
          type="text"
          placeholder="Search by property name..."
          className="w-full md:w-1/2 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Property Grid */}
      {approvedProperties.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {approvedProperties.map((property) => (
            <div key={property._id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
              {/* Property Image with Count */}
              <div className="relative h-48 bg-gray-200 overflow-hidden">
                {property.images && property.images.length > 0 ? (
                  <>
                    <img
                      src={`${backendUrl}${property.images[0]}`}
                      alt={property.propertyName}
                      className="w-full h-full object-cover cursor-pointer"
                      onClick={() => openImageModal(property)}
                    />
                    {/* Image count badge */}
                    <div className="absolute bottom-2 right-2 bg-black bg-opacity-50 text-white px-2 py-1 rounded text-sm">
                      {property.images.length} {property.images.length === 1 ? 'Image' : 'Images'}
                    </div>
                  </>
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-500">
                    No Image Available
                  </div>
                )}
              </div>

              {/* Rest of your property details... */}
              <div className="p-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-2">{property.propertyName}</h2>
                <p className="text-gray-600 mb-1">{property.address}</p>
                <p className="text-gray-600 mb-1">{property.city}, {property.state}</p>

                <div className="flex justify-between items-center mt-4">
                  <span className="text-lg font-bold text-blue-600">${property.price.toLocaleString()}</span>
                  <span className="text-gray-600">{property.area} sq.ft</span>
                </div>

                {/* Features */}
                {property.features && property.features.length > 0 && (
                  <div className="mt-4">
                    <h3 className="text-sm font-semibold text-gray-700 mb-1">Features:</h3>
                    <div className="flex flex-wrap gap-2">
                      {property.features[0].split(',').map((feature, index) => (
                        <span key={index} className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                          {feature.trim()}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Contact Info */}
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <h3 className="text-sm font-semibold text-gray-700 mb-1">Contact:</h3>
                  <p className="text-gray-600">{property.sellerName}</p>
                  <p className="text-gray-600">{property.contactDetails.phone}</p>
                  <p className="text-gray-600">{property.contactDetails.email}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">
            {searchTerm ? 'No matching properties found' : 'No approved properties available'}
          </p>
        </div>
      )}

      {/* Image Modal */}
      {selectedProperty && (
        <div className="fixed inset-0 bg-black/50 bg-opacity-75 flex items-center justify-center z-50 p-4">
          <div className="relative max-w-4xl w-full bg-white rounded-lg overflow-hidden">
            {/* Close button */}
            <button 
              onClick={closeImageModal}
              className="absolute top-4 right-4 z-10 text-white bg-black bg-opacity-50 rounded-full p-2 hover:bg-opacity-75 transition"
            >
              <FiX size={24} />
            </button>

            {/* Main image */}
            <div className="relative h-96">
              <img
                src={`${backendUrl}${selectedProperty.images[currentImageIndex]}`}
                alt={`Property ${currentImageIndex + 1}`}
                className="w-full h-full object-contain"
              />

              {/* Navigation arrows */}
              <button
                onClick={() => navigateImage('prev')}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white rounded-full p-2 hover:bg-opacity-75 transition"
              >
                <FiChevronLeft size={24} />
              </button>
              <button
                onClick={() => navigateImage('next')}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white rounded-full p-2 hover:bg-opacity-75 transition"
              >
                <FiChevronRight size={24} />
              </button>

              {/* Image counter */}
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black-50 bg-opacity-50 text-white px-3 py-1 rounded-full text-sm">
                {currentImageIndex + 1} / {selectedProperty.images.length}
              </div>
            </div>

            {/* Thumbnail navigation */}
            <div className="flex overflow-x-auto p-4 space-x-2 bg-gray-100">
              {selectedProperty.images.map((img, index) => (
                <img
                  key={index}
                  src={`${backendUrl}${img}`}
                  alt={`Thumbnail ${index + 1}`}
                  className={`w-16 h-16 object-cover cursor-pointer rounded border-2 ${currentImageIndex === index ? 'border-blue-500' : 'border-transparent'}`}
                  onClick={() => setCurrentImageIndex(index)}
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PropertyListing;