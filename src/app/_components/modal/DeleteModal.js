// src/app/_components/DeleteModal.js
'use client';

import React from 'react';

const DeleteModal = ({ show, handleClose, handleConfirm }) => {
  if (!show) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded shadow-lg max-w-sm w-full">
        <h2 className="text-xl font-semibold mb-4">Confirm Deletion</h2>
        <p className="mb-6">Are you sure you want to delete this item?</p>
        <div className="flex justify-end space-x-2">
          <button className="px-4 py-2 bg-gray-500 text-white rounded" onClick={handleClose}>Cancel</button>
          <button className="px-4 py-2 bg-red-600 text-white rounded" onClick={handleConfirm}>Delete</button>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;