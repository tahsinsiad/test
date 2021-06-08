import Container from '@/components/core/Container';
import Postlisting from '@/components/core/PostListing';
import { getSearchResult as searchResult } from '../utils/api';

const Search = (props) => {
  return (
    <Container>
      <style jsx>{`
        .no-result {
          text-align: center;
          margin-top: 100px;
          font-size: ;
        }

        p {
          font-family: 'Poly', serif;
          font-size: 19px;
          line-height: 25px;
        }
      `}</style>
      {props.resultLen < 1 ? (
        <p className="no-result">No result found</p>
      ) : (
        <>
          <h1
            style={{
              marginTop: '100px',
              marginBottom: '50px'
            }}>{`${props.resultLen} result(s) found.`}</h1>
          <Postlisting posts={props.posts} />
        </>
      )}
    </Container>
  );
};

Search.getInitialProps = searchResult;

export default Search;
