// src/app/upload/page.js
import { auth } from '@/auth';
import UploadImage from '../Componet';

const UploadPage =async () => {
  let session = await auth();
  let user = session?.user;

  return (
    <div className="container mx-auto p-4">
      <UploadImage email={user?.email} />
    </div>
  );
};

export default UploadPage;
