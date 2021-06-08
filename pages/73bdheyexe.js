import { useEffect, useState } from 'react';
import Layout from '@/components/core/Layout';
import ComPreview from '@/components/Preview';
import { getPreviewData as previewData } from '../utils/api';

const Preview = (props) => {
  let [hasPermission, setPermission] = useState(props.isNotPreview);

  const handleGivePermission = (e) => {
    e.preventDefault();

    if (e.target.elements.passToView.value == process.env.preview_password) {
      setPermission(true);
    } else {
      Swal.fire({
        title: 'Sorry!',
        text: "You don't have access to this post",
        icon: 'error',
        confirmButtonText: 'Ok'
      });
    }
  };

  useEffect(() => {}, [hasPermission]);

  if (hasPermission) {
    return (
      <Layout title="Preview">
        <style jsx>{`
          h1,
          h2,
          h3,
          h4,
          h5,
          h6 {
            font-family: 'Catamaran', sans-serif;
            font-weight: 700;
          }

          h1 {
            font-size: 70px;
            padding-left: 30px;
            border-left: 10px solid #bf8845;
            line-height: 70px;
            margin-bottom: 50px;
          }
          p {
            font-family: 'Poly', serif;
            font-size: 19px;
            line-height: 25px;
          }
          .latest-container {
            margin: 100px auto;
            width: 100%;
          }

          @media all and (min-width: 768px) and (max-width: 1024px) {
          }

          @media all and (max-width: 767px) {
            h1.page-title {
              font-size: 35px;
              padding-left: 15px;
              line-height: 35px;
              margin: 20px auto;
              width: 90%;
            }

            .latest-container {
              margin: 20px auto;
              width: 100%;
            }
          }
        `}</style>
        <div className="latest-container">
          <h1 className="page-title">Preview</h1>

          <ComPreview posts={props.posts} />
        </div>
      </Layout>
    );
  } else {
    return (
      <>
        <form onSubmit={handleGivePermission}>
          <input name="passToView"></input>
          <button>Access</button>
        </form>
      </>
    );
  }
};

Preview.getInitialProps = previewData;

export default Preview;
