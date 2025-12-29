import { useEffect, useState } from 'react';
import { Mail, Clock, Search, Trash2, CheckCircle, Circle, AlertCircle, Sparkles, Phone, Building } from 'lucide-react';
import api from '../lib/api';
import toast from 'react-hot-toast';
import { format } from 'date-fns';

export default function Contacts() {
  const [contacts, setContacts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedContact, setSelectedContact] = useState<any>(null);

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    try {
      const { data } = await api.get('/contact');
      setContacts(data.data);
    } catch (error) {
      toast.error('Failed to load contacts');
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id: string, status: string) => {
    try {
      await api.patch(`/contact/${id}`, { status });
      toast.success('Status updated successfully');
      fetchContacts();
    } catch (error) {
      toast.error('Failed to update status');
    }
  };

  const deleteContact = async (id: string) => {
    if (!confirm('Are you sure you want to delete this contact?')) return;
    
    try {
      await api.delete(`/contact/${id}`);
      toast.success('Contact deleted successfully');
      fetchContacts();
      setSelectedContact(null);
    } catch (error) {
      toast.error('Failed to delete contact');
    }
  };

  const filteredContacts = contacts
    .filter(c => filter === 'all' || c.status === filter)
    .filter(c => 
      searchQuery === '' ||
      c.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.subject?.toLowerCase().includes(searchQuery.toLowerCase())
    );

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'new':
        return <Circle className="w-4 h-4 text-green-400" />;
      case 'in-progress':
        return <AlertCircle className="w-4 h-4 text-blue-400" />;
      case 'resolved':
        return <CheckCircle className="w-4 h-4 text-gray-400" />;
      default:
        return <Circle className="w-4 h-4 text-gray-400" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'new':
        return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'in-progress':
        return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      case 'resolved':
        return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
      default:
        return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="relative">
          <div className="w-16 h-16 border-4 border-cyan-500/20 border-t-cyan-500 rounded-full animate-spin" />
          <div className="absolute inset-0 flex items-center justify-center">
            <Sparkles className="w-6 h-6 text-cyan-400 animate-pulse" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="glass-card border-white/10">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gradient">Contact Forms</h1>
            <p className="text-gray-400 mt-2">Manage all customer inquiries and submissions</p>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 rounded-lg border border-cyan-500/30">
            <Mail className="w-5 h-5 text-cyan-400" />
            <span className="text-xl font-bold text-white">{contacts.length}</span>
            <span className="text-gray-400">Total</span>
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="glass-card border-white/10">
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Search Bar */}
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search by name, email, or subject..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent text-white placeholder-gray-500"
            />
          </div>

          {/* Status Filters */}
          <div className="flex gap-2 flex-wrap">
            {[
              { value: 'all', label: 'All', count: contacts.length },
              { value: 'new', label: 'New', count: contacts.filter(c => c.status === 'new').length },
              { value: 'in-progress', label: 'In Progress', count: contacts.filter(c => c.status === 'in-progress').length },
              { value: 'resolved', label: 'Resolved', count: contacts.filter(c => c.status === 'resolved').length }
            ].map((status) => (
              <button
                key={status.value}
                onClick={() => setFilter(status.value)}
                className={`px-4 py-2 rounded-lg capitalize transition-all duration-200 font-medium ${
                  filter === status.value
                    ? 'bg-gradient-to-r from-cyan-500 to-purple-500 text-white shadow-lg shadow-cyan-500/50'
                    : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white border border-white/10'
                }`}
              >
                {status.label}
                <span className="ml-2 text-xs opacity-75">({status.count})</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Contacts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredContacts.map((contact) => (
          <div 
            key={contact._id} 
            className="glass-card border-white/10 hover:border-cyan-500/30 transition-all duration-300 group cursor-pointer"
            onClick={() => setSelectedContact(contact)}
          >
            {/* Header */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-start gap-3">
                <div className="bg-gradient-to-r from-cyan-500 to-purple-500 p-3 rounded-lg group-hover:scale-110 transition-transform duration-300">
                  <Mail className="text-white" size={20} />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-lg font-bold text-white mb-1 truncate">{contact.name}</h3>
                  <p className="text-sm text-cyan-400 truncate">{contact.email}</p>
                  {contact.phone && (
                    <p className="text-sm text-gray-400 flex items-center gap-1 mt-1">
                      <Phone size={12} />
                      {contact.phone}
                    </p>
                  )}
                  {contact.company && (
                    <p className="text-sm text-gray-400 flex items-center gap-1 mt-1">
                      <Building size={12} />
                      {contact.company}
                    </p>
                  )}
                </div>
              </div>
              <div className="flex flex-col items-end gap-2">
                <span className="flex items-center gap-1 text-xs text-gray-500">
                  <Clock size={12} />
                  {format(new Date(contact.createdAt), 'MMM dd, yyyy')}
                </span>
                <span className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(contact.status)}`}>
                  {getStatusIcon(contact.status)}
                  {contact.status}
                </span>
              </div>
            </div>

            {/* Subject */}
            <div className="mb-3">
              <p className="text-sm font-medium text-gray-400 mb-1">Subject</p>
              <p className="text-white line-clamp-1">{contact.subject}</p>
            </div>

            {/* Message Preview */}
            <div className="mb-4">
              <p className="text-sm font-medium text-gray-400 mb-1">Message</p>
              <p className="text-gray-300 text-sm line-clamp-2">{contact.message}</p>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2 pt-3 border-t border-white/10">
              <select
                value={contact.status}
                onChange={(e) => {
                  e.stopPropagation();
                  updateStatus(contact._id, e.target.value);
                }}
                className="flex-1 px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-sm text-white focus:ring-2 focus:ring-cyan-400 focus:outline-none"
                onClick={(e) => e.stopPropagation()}
              >
                <option value="new">New</option>
                <option value="in-progress">In Progress</option>
                <option value="resolved">Resolved</option>
              </select>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  deleteContact(contact._id);
                }}
                className="p-2 bg-red-500/20 hover:bg-red-500/30 text-red-400 rounded-lg transition-all duration-200 border border-red-500/30"
              >
                <Trash2 size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredContacts.length === 0 && (
        <div className="glass-card border-white/10 text-center py-16">
          <Mail className="w-16 h-16 text-gray-600 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-white mb-2">No contacts found</h3>
          <p className="text-gray-400">
            {searchQuery ? 'Try adjusting your search query' : 'No contacts match the selected filter'}
          </p>
        </div>
      )}

      {/* Contact Detail Modal */}
      {selectedContact && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={() => setSelectedContact(null)}>
          <div className="glass-card border-white/20 max-w-2xl w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-white/10">
              <h2 className="text-2xl font-bold text-gradient">Contact Details</h2>
              <button
                onClick={() => setSelectedContact(null)}
                className="text-gray-400 hover:text-white transition-colors"
              >
                ✕
              </button>
            </div>

            <div className="space-y-6">
              {/* Contact Info */}
              <div>
                <div className="flex items-start gap-4 mb-4">
                  <div className="bg-gradient-to-r from-cyan-500 to-purple-500 p-4 rounded-lg">
                    <Mail className="text-white" size={24} />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-white mb-2">{selectedContact.name}</h3>
                    <p className="text-cyan-400 mb-1">{selectedContact.email}</p>
                    {selectedContact.phone && (
                      <p className="text-gray-400 flex items-center gap-2">
                        <Phone size={14} />
                        {selectedContact.phone}
                      </p>
                    )}
                    {selectedContact.company && (
                      <p className="text-gray-400 flex items-center gap-2 mt-1">
                        <Building size={14} />
                        {selectedContact.company}
                      </p>
                    )}
                  </div>
                  <span className={`flex items-center gap-1 px-3 py-1.5 rounded-full text-sm font-medium border ${getStatusColor(selectedContact.status)}`}>
                    {getStatusIcon(selectedContact.status)}
                    {selectedContact.status}
                  </span>
                </div>
              </div>

              {/* Subject */}
              <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                <p className="text-sm font-medium text-gray-400 mb-2">Subject</p>
                <p className="text-white font-medium">{selectedContact.subject}</p>
              </div>

              {/* Message */}
              <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                <p className="text-sm font-medium text-gray-400 mb-2">Message</p>
                <p className="text-gray-300 whitespace-pre-wrap">{selectedContact.message}</p>
              </div>

              {/* Metadata */}
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-400 flex items-center gap-2">
                  <Clock size={14} />
                  Received: {format(new Date(selectedContact.createdAt), 'PPpp')}
                </span>
              </div>

              {/* Actions */}
              <div className="flex gap-3 pt-4 border-t border-white/10">
                <select
                  value={selectedContact.status}
                  onChange={(e) => updateStatus(selectedContact._id, e.target.value)}
                  className="flex-1 px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:ring-2 focus:ring-cyan-400 focus:outline-none"
                >
                  <option value="new">New</option>
                  <option value="in-progress">In Progress</option>
                  <option value="resolved">Resolved</option>
                </select>
                <button
                  onClick={() => deleteContact(selectedContact._id)}
                  className="px-4 py-3 bg-red-500/20 hover:bg-red-500/30 text-red-400 rounded-lg transition-all duration-200 border border-red-500/30 font-medium"
                >
                  Delete Contact
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
