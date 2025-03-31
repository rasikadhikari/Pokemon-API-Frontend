import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function RegionDetail() {
  const { id } = useParams();
  const [region, setRegion] = useState<any | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRegionData = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/regions/${id}`);
        const regionData = response.data.dataById || [];
        setRegion(regionData);
        toast.success("Region details loaded successfully!");
      } catch (err) {
        setError("Error fetching region details.");
        toast.error("Failed to load region details.");
        console.error("Error fetching region data:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchRegionData();
  }, [id]);

  if (loading) {
    return (
      <p className="text-center text-gray-500">Loading region details...</p>
    );
  }

  if (error) {
    return <p className="text-center text-red-500">{error}</p>;
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <ToastContainer />
      {/* Region Name */}
      <h1 className="text-4xl font-extrabold text-center text-green-600 font-serif mb-6">
        {region.name}
      </h1>

      <div className="flex items-start justify-between gap-6">
        {/* Description Box */}
        <div className="flex-1 border p-4 shadow-md rounded-lg bg-gray-100">
          <p className="text-lg text-gray-700">{region.description}</p>
        </div>

        {/* Image */}
        <img
          src={`http://localhost:3000/${region.image}`}
          alt={region.name}
          className="w-64 h-64 object-cover rounded-lg border shadow-lg"
        />
      </div>
    </div>
  );
}

export default RegionDetail;
