const Test = ({ id, nounce }) => {
  return (
    <h2>
      id : {id}, nounce : {nounce}
    </h2>
  );
};

export async function getServerSideProps({ params }) {
  console.log(params);
  return {
    props: {
      id,
      nounce
    } // will be passed to the page component as props
  };
}

export default Test;
