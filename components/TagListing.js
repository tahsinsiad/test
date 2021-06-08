const TagListing = (props) => (
  <span>
    <style jsx>{`
      .tags-link {
        font-size: 20px;
        line-height: 20px;
        height: 20px;
        text-transform: uppercase;
        text-decoration: none;
        color: #000;
        font-weight: 500;
      }

      @media all and (min-width: 768px) and (max-width: 1024px) {
      }
      @media all and (max-width: 767px) {
        .tags-link {
          font-size: 15px;
          line-height: 15px;
        }
      }
    `}</style>
    {props.tags.map((tag, i) => (
      <span key={tag.id} className="tags-link">
        {tag.name}
        {i == props.tags.length - 1 ? null : `, `}
      </span>
    ))}
  </span>
);

export default TagListing;
