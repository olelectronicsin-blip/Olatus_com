import { useEffect, useMemo, useState } from 'react';
import api, { API_ORIGIN } from '../lib/api';
import { Mail, Wrench, GraduationCap, RefreshCw } from 'lucide-react';

type InboxItem = {
  id: string;
  type: 'contact' | 'service' | 'internship';
  name: string;
  email: string;
  subject: string;
  message: string;
  status: string;
  createdAt: string;
};

export default function Inbox() {
  const [items, setItems] = useState<InboxItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [type, setType] = useState<'all' | 'contact' | 'service' | 'internship'>('all');
  const [query, setQuery] = useState('');
  const [selected, setSelected] = useState<InboxItem | null>(null);
  const [detail, setDetail] = useState<any | null>(null);
  const [detailLoading, setDetailLoading] = useState(false);
  const [detailError, setDetailError] = useState<string | null>(null);

  const iconFor = (t: InboxItem['type']) => {
    if (t === 'contact') return <Mail size={16} className="text-cyan-300" />;
    if (t === 'service') return <Wrench size={16} className="text-purple-300" />;
    return <GraduationCap size={16} className="text-amber-300" />;
  };

  const load = async () => {
    setLoading(true);
    setError(null);
    try {
      const params = new URLSearchParams();
      params.set('limit', '100');
      if (type !== 'all') params.set('type', type);
      const { data } = await api.get(`/admin/inbox?${params.toString()}`);
      setItems(data.data.items || []);
    } catch (e: any) {
      setError(e?.response?.data?.error || 'Failed to load inbox');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [type]);

  const filtered = useMemo(() => {
    const q = query.toLowerCase().trim();
    if (!q) return items;
    return items.filter((i) =>
      [i.name, i.email, i.subject, i.message, i.status, i.type]
        .filter(Boolean)
        .join(' ') 
        .toLowerCase()
        .includes(q)
    );
  }, [items, query]);

  const makeUrl = (url?: string) => {
    if (!url) return '';
    if (url.startsWith('http://') || url.startsWith('https://')) return url;
    return `${API_ORIGIN}${url}`;
  };

  const openDetail = async (item: InboxItem) => {
    setSelected(item);
    setDetail(null);
    setDetailError(null);
    setDetailLoading(true);
    try {
      let url = '';
      if (item.type === 'contact') url = `/contact/${item.id}`;
      else if (item.type === 'service') url = `/service-requests/${item.id}`;
      else url = `/internships/applications/${item.id}`;

      const { data } = await api.get(url);
      setDetail(data.data || data);
    } catch (e: any) {
      setDetailError(e?.response?.data?.error || 'Failed to load details');
    } finally {
      setDetailLoading(false);
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold text-white">Global Inbox</h1>
        <button
          onClick={load}
          disabled={loading}
          className="px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-gray-200 hover:bg-white/10 flex items-center gap-2 disabled:opacity-60"
        >
          <RefreshCw size={16} className={loading ? 'animate-spin' : ''} />
          Refresh
        </button>
      </div>

      <div className="flex flex-col md:flex-row gap-3 mb-4">
        <div className="flex gap-2">
          {(['all','contact','service','internship'] as const).map((t) => (
            <button
              key={t}
              onClick={() => setType(t)}
              className={`px-3 py-1.5 rounded-full text-sm border ${type===t? 'bg-gradient-to-r from-cyan-500/20 to-purple-500/20 text-white border-cyan-500/30':'bg-white/5 text-gray-300 border-white/10 hover:bg-white/10'}`}
            >
              {t[0].toUpperCase()+t.slice(1)}
            </button>
          ))}
        </div>
        <input
          value={query}
          onChange={(e)=>setQuery(e.target.value)}
          placeholder="Search name, email, subject, message..."
          className="flex-1 px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-400"
        />
      </div>

      {error && (
        <div className="mb-3 text-sm text-red-300 bg-red-900/20 border border-red-500/30 rounded p-2">{error}</div>
      )}

      <div className="glass-panel rounded-lg overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-white/5 text-gray-300">
              <th className="text-left p-3">Type</th>
              <th className="text-left p-3">From</th>
              <th className="text-left p-3">Email</th>
              <th className="text-left p-3">Subject</th>
              <th className="text-left p-3">Status</th>
              <th className="text-left p-3">Received</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan={6} className="p-6 text-center text-gray-400">Loading...</td></tr>
            ) : filtered.length === 0 ? (
              <tr><td colSpan={6} className="p-6 text-center text-gray-400">No items found</td></tr>
            ) : (
              filtered.map((i)=> (
                <tr key={`${i.type}-${i.id}`} className="border-t border-white/10 hover:bg-white/5 cursor-pointer" onClick={()=>openDetail(i)}>
                  <td className="p-3">
                    <div className="flex items-center gap-2">
                      {iconFor(i.type)}
                      <span className="capitalize text-gray-200">{i.type}</span>
                    </div>
                  </td>
                  <td className="p-3 text-white">{i.name}</td>
                  <td className="p-3 text-gray-300">{i.email}</td>
                  <td className="p-3 text-gray-200">
                    <div className="line-clamp-1">{i.subject}</div>
                    {i.message && <div className="text-xs text-gray-400 line-clamp-1">{i.message}</div>}
                  </td>
                  <td className="p-3">
                    <span className="px-2 py-1 rounded text-xs bg-white/5 border border-white/10 text-gray-200">
                      {i.status}
                    </span>
                  </td>
                  <td className="p-3 text-gray-400">{new Date(i.createdAt).toLocaleString()}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {selected && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <div className="relative bg-[#001a24] rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto border border-cyan-500/30">
            <button onClick={()=>{ setSelected(null); setDetail(null); setDetailError(null); }} className="absolute top-4 right-4 text-gray-400 hover:text-white">
              ✕
            </button>
            <div className="p-6">
              <h3 className="text-xl font-semibold text-white mb-4">{selected.type[0].toUpperCase()+selected.type.slice(1)} Details</h3>
              {detailLoading && <div className="text-gray-300">Loading details...</div>}
              {detailError && <div className="text-red-300 bg-red-900/20 border border-red-500/30 rounded p-2">{detailError}</div>}
              {!detailLoading && !detailError && detail && (
                <div className="space-y-3">
                  {selected.type === 'contact' && (
                    <div className="grid grid-cols-2 gap-3 text-gray-200">
                      <div><span className="text-gray-400">Name:</span> {detail.name}</div>
                      <div><span className="text-gray-400">Email:</span> {detail.email}</div>
                      {detail.phone && <div><span className="text-gray-400">Phone:</span> {detail.phone}</div>}
                      {detail.company && <div><span className="text-gray-400">Company:</span> {detail.company}</div>}
                      <div className="col-span-2"><span className="text-gray-400">Subject:</span> {detail.subject}</div>
                      <div className="col-span-2"><span className="text-gray-400">Message:</span> <div className="mt-1 whitespace-pre-wrap text-gray-300">{detail.message}</div></div>
                      <div><span className="text-gray-400">Status:</span> {detail.status}</div>
                      <div><span className="text-gray-400">Received:</span> {new Date(detail.createdAt).toLocaleString()}</div>
                    </div>
                  )}

                  {selected.type === 'service' && (
                    <div className="grid grid-cols-2 gap-3 text-gray-200">
                      <div><span className="text-gray-400">Customer:</span> {detail.customerName}</div>
                      <div><span className="text-gray-400">Email:</span> {detail.email}</div>
                      <div><span className="text-gray-400">Phone:</span> {detail.phone}</div>
                      {detail.company && <div><span className="text-gray-400">Company:</span> {detail.company}</div>}
                      <div><span className="text-gray-400">Service Type:</span> {detail.serviceType}</div>
                      <div><span className="text-gray-400">Status:</span> {detail.status}</div>
                      <div className="col-span-2"><span className="text-gray-400">Project:</span> {detail.projectName}</div>
                      <div className="col-span-2"><span className="text-gray-400">Description:</span> <div className="mt-1 whitespace-pre-wrap text-gray-300">{detail.description}</div></div>
                      {detail.specifications && (
                        <div className="col-span-2"><span className="text-gray-400">Specifications:</span>
                          <pre className="mt-1 bg-white/5 p-3 rounded border border-white/10 text-gray-300 overflow-x-auto">{JSON.stringify(detail.specifications, null, 2)}</pre>
                        </div>
                      )}
                      {Array.isArray(detail.files) && detail.files.length > 0 && (
                        <div className="col-span-2"><span className="text-gray-400">Files:</span>
                          <ul className="mt-1 space-y-1">
                            {detail.files.map((f: any, idx: number)=> (
                              <li key={idx} className="text-cyan-300"><a href={makeUrl(f.fileUrl || f.url)} target="_blank" rel="noreferrer">{f.fileName || f.name}</a></li>
                            ))}
                          </ul>
                        </div>
                      )}
                      <div><span className="text-gray-400">Received:</span> {new Date(detail.createdAt).toLocaleString()}</div>
                    </div>
                  )}

                  {selected.type === 'internship' && (
                    <div className="grid grid-cols-2 gap-3 text-gray-200">
                      <div><span className="text-gray-400">Name:</span> {detail.firstName} {detail.lastName}</div>
                      <div><span className="text-gray-400">Email:</span> {detail.email}</div>
                      <div><span className="text-gray-400">Phone:</span> {detail.phone}</div>
                      <div><span className="text-gray-400">Location:</span> {detail.currentLocation}</div>
                      <div><span className="text-gray-400">Institution:</span> {detail.institution}</div>
                      <div><span className="text-gray-400">Degree:</span> {detail.degree}</div>
                      <div><span className="text-gray-400">Field:</span> {detail.fieldOfStudy}</div>
                      <div><span className="text-gray-400">Graduation Year:</span> {detail.graduationYear}</div>
                      <div><span className="text-gray-400">Position:</span> {detail.position}</div>
                      <div><span className="text-gray-400">Type:</span> {detail.internshipType}</div>
                      {Array.isArray(detail.skills) && detail.skills.length > 0 && (
                        <div className="col-span-2"><span className="text-gray-400">Skills:</span> {detail.skills.join(', ')}</div>
                      )}
                      {detail.coverLetter && (
                        <div className="col-span-2"><span className="text-gray-400">Cover Letter:</span> <div className="mt-1 whitespace-pre-wrap text-gray-300">{detail.coverLetter}</div></div>
                      )}
                      {detail.resume && (
                        <div><span className="text-gray-400">Resume:</span> <a className="text-cyan-300" href={makeUrl(detail.resume.fileUrl)} target="_blank" rel="noreferrer">{detail.resume.fileName}</a></div>
                      )}
                      {detail.portfolio?.fileUrl && (
                        <div><span className="text-gray-400">Portfolio:</span> <a className="text-cyan-300" href={makeUrl(detail.portfolio.fileUrl)} target="_blank" rel="noreferrer">{detail.portfolio.fileUrl}</a></div>
                      )}
                      {detail.linkedinUrl && (<div><span className="text-gray-400">LinkedIn:</span> <a className="text-cyan-300" href={detail.linkedinUrl} target="_blank" rel="noreferrer">{detail.linkedinUrl}</a></div>)}
                      {detail.githubUrl && (<div><span className="text-gray-400">GitHub:</span> <a className="text-cyan-300" href={detail.githubUrl} target="_blank" rel="noreferrer">{detail.githubUrl}</a></div>)}
                      <div><span className="text-gray-400">Status:</span> {detail.status}</div>
                      <div><span className="text-gray-400">Applied:</span> {new Date(detail.appliedAt || detail.createdAt).toLocaleString()}</div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
