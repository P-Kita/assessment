import React, { useState, useEffect } from 'react';
import { Search, Plus, Edit, Trash2, User, LogOut, Book } from 'lucide-react';

const BookStoreApp = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [books, setBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingBook, setEditingBook] = useState(null);
  const [loginData, setLoginData] = useState({ email: '', password: '' });

  const sampleBooks = [
    { id: 1, name: "The Great Gatsby", category: "Fiction", price: 12.99, description: "A classic American novel by F. Scott Fitzgerald" },
    { id: 2, name: "To Kill a Mockingbird", category: "Fiction", price: 14.99, description: "Harper Lee's masterpiece about justice and morality" },
    { id: 3, name: "1984", category: "Science Fiction", price: 13.99, description: "George Orwell's dystopian masterpiece" },
    { id: 4, name: "Pride and Prejudice", category: "Romance", price: 11.99, description: "Jane Austen's beloved romantic comedy" },
    { id: 5, name: "The Catcher in the Rye", category: "Fiction", price: 12.49, description: "J.D. Salinger's coming-of-age story" }
  ];

  const categories = ["All", "Fiction", "Science Fiction", "Romance", "Mystery", "Biography"];

  useEffect(() => {
    if (isLoggedIn) {
      setBooks(sampleBooks);
    }
  }, [isLoggedIn]);

  const handleLogin = () => {
    if (loginData.email && loginData.password) {
      setIsLoggedIn(true);
      setCurrentUser({ email: loginData.email, name: loginData.email.split('@')[0] });
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentUser(null);
    setBooks([]);
  };

  const filteredBooks = books.filter(book => {
    const matchesSearch = book.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          book.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || book.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleAddBook = (bookData) => {
    const newBook = {
      id: Math.max(...books.map(b => b.id), 0) + 1,
      ...bookData,
      price: parseFloat(bookData.price)
    };
    setBooks([...books, newBook]);
    setShowAddModal(false);
  };

  const handleUpdateBook = (bookData) => {
    setBooks(books.map(book =>
      book.id === editingBook.id
        ? { ...book, ...bookData, price: parseFloat(bookData.price) }
        : book
    ));
    setEditingBook(null);
  };

  const handleDeleteBook = (bookId) => {
    setBooks(books.filter(book => book.id !== bookId));
  };

  const LoginPage = () => (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md">
        <div className="text-center mb-8">
          <div className="mx-auto w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mb-4">
            <Book className="w-8 h-8 text-indigo-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-800">Book Store</h1>
          <p className="text-gray-600 mt-2">Sign in to your account</p>
        </div>

        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
            <input
              type="email"
              value={loginData.email}
              onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
              placeholder="Enter your email"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
            <input
              type="password"
              value={loginData.password}
              onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
              placeholder="Enter your password"
            />
          </div>

          <button
            onClick={handleLogin}
            className="w-full bg-indigo-600 text-white py-3 rounded-lg font-medium hover:bg-indigo-700 transition-colors"
          >
            Sign In
          </button>
        </div>
        <div className="mt-6 text-center text-sm text-gray-600">
          Demo: Use any email and password to login
        </div>
      </div>
    </div>
  );

  const BookFormModal = ({ book, onSubmit, onClose }) => {
    const [formData, setFormData] = useState({
      name: book?.name || '',
      category: book?.category || 'Fiction',
      price: book?.price || '',
      description: book?.description || ''
    });

    const handleSubmit = () => {
      onSubmit(formData);
    };

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
        <div className="bg-white rounded-2xl p-6 w-full max-w-md">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            {book ? 'Edit Book' : 'Add New Book'}
          </h2>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Book Name</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                placeholder="Enter book name"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
              >
                {categories.filter(cat => cat !== 'All').map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Price ($)</label>
              <input
                type="number"
                step="0.01"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                placeholder="0.00"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                rows="3"
                placeholder="Enter book description"
              />
            </div>

            <div className="flex gap-3 pt-4">
              <button
                onClick={onClose}
                className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                className="flex-1 px-4 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
              >
                {book ? 'Update' : 'Add'} Book
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const Dashboard = () => (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Book className="w-8 h-8 text-indigo-600 mr-3" />
              <h1 className="text-2xl font-bold text-gray-800">Book Store</h1>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center text-gray-600">
                <User className="w-5 h-5 mr-2" />
                <span>Welcome, {currentUser?.name}</span>
              </div>
              <button
                onClick={handleLogout}
                className="flex items-center text-gray-600 hover:text-gray-800"
              >
                <LogOut className="w-5 h-5 mr-1" />
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search books..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
            >
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>

            <button
              onClick={() => setShowAddModal(true)}
              className="flex items-center px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
            >
              <Plus className="w-5 h-5 mr-2" />
              Add Book
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredBooks.map(book => (
            <div key={book.id} className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">{book.name}</h3>
                  <span className="inline-block px-3 py-1 bg-indigo-100 text-indigo-800 rounded-full text-sm">
                    {book.category}
                  </span>
                </div>
                <div className="text-right text-2xl font-bold text-indigo-600">${book.price}</div>
              </div>

              <p className="text-gray-600 mb-4 line-clamp-3">{book.description}</p>

              <div className="flex gap-2">
                <button
                  onClick={() => setEditingBook(book)}
                  className="flex-1 flex items-center justify-center px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                >
                  <Edit className="w-4 h-4 mr-2" /> Edit
                </button>
                <button
                  onClick={() => handleDeleteBook(book.id)}
                  className="flex-1 flex items-center justify-center px-4 py-2 bg-red-50 text-red-700 rounded-lg hover:bg-red-100"
                >
                  <Trash2 className="w-4 h-4 mr-2" /> Delete
                </button>
              </div>
            </div>
          ))}
        </div>

        {filteredBooks.length === 0 && (
          <div className="text-center py-12">
            <Book className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-medium text-gray-500 mb-2">No books found</h3>
            <p className="text-gray-400">Try adjusting your search or add a new book</p>
          </div>
        )}
      </main>

      {showAddModal && (
        <BookFormModal
          onSubmit={handleAddBook}
          onClose={() => setShowAddModal(false)}
        />
      )}
      {editingBook && (
        <BookFormModal
          book={editingBook}
          onSubmit={handleUpdateBook}
          onClose={() => setEditingBook(null)}
        />
      )}
    </div>
  );

  return isLoggedIn ? <Dashboard /> : <LoginPage />;
};

export default BookStoreApp;
