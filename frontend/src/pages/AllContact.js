import React, { useEffect, useState } from 'react';
import SummaryApi from '../common';
import moment from 'moment';
import 'moment/locale/vi';
import { toast } from 'react-toastify';

const AllContact = () => {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchContacts = async () => {
    try {
      const response = await fetch(SummaryApi.getAllContacts.url, {
        method: SummaryApi.getAllContacts.method,
        credentials: 'include'
      });
      
      const data = await response.json();
      
      if (data.success) {
        setContacts(data.data);
      } else {
        toast.error(data.message);
      }
      
    } catch (err) {
      toast.error("Lỗi khi tải dữ liệu");
    } finally {
      setLoading(false); 
    }
  };

  const handleStatusChange = async (contactId, newStatus) => {
    try {
      const response = await fetch(SummaryApi.updateContactStatus.url, {
        method: SummaryApi.updateContactStatus.method,
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          contactId,
          status: newStatus
        })
      });

      const data = await response.json();
      
      if (data.success) {
        toast.success("Cập nhật trạng thái thành công");
        fetchContacts();
      } else {
        toast.error(data.message);
      }
      
    } catch (err) {
      toast.error("Lỗi khi cập nhật trạng thái");
    }
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  return (
    <div className='bg-white pb-4'>
      <table className='w-full userTable'>
        <thead>
          <tr className='bg-red-600 text-white'>
            <th>STT</th>
            <th>Tên</th>
            <th>Email</th>
            <th>Số điện thoại</th>
            <th>Nội dung</th>
            <th>Trạng thái</th>
            <th>Thời gian</th>
          </tr>
        </thead>
        <tbody>
          {contacts.map((contact, index) => (
            <tr key={contact._id}>
              <td>{index + 1}</td>
              <td>{contact.name}</td>
              <td>{contact.email}</td>
              <td>{contact.phone}</td>
              <td>{contact.message}</td>
              <td>
                <select 
                  value={contact.status}
                  onChange={(e) => handleStatusChange(contact._id, e.target.value)}
                  className="p-1 border rounded"
                >
                  <option value="Chưa xử lý">Chưa xử lý</option>
                  <option value="Đang xử lý">Đang xử lý</option>
                  <option value="Đã xử lý">Đã xử lý</option>
                </select>
              </td>
              <td>{moment(contact.createdAt).format('LLL')}</td>
            </tr>
          ))}
        </tbody>
      </table>
      
      {loading && <div className="text-center py-4">Đang tải...</div>}
      
      {!loading && contacts.length === 0 && (
        <div className="text-center py-4">Không có liên hệ nào</div>
      )}
    </div>
  );
};

export default AllContact;
