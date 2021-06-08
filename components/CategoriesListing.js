import Link from 'next/link';

const CategoriesListing = (props) => (
  <span>
    <style jsx>{`
      .categories-link {
        font-size: 20px;
        line-height: 20px;
        height: 20px;
        text-transform: uppercase;
        text-decoration: none;
        color: #bf8844;
        font-weight: 700;
      }

      .categories-link:hover {
        color: #c98735;
      }

      @media all and (max-width: 767px) {
        .categories-link {
          font-size: 15px;
          line-height: 15px;
        }
      }
    `}</style>
    {props.categories.map((cat, i) => (
      <Link
        key={`category-${cat.id}`}
        as={`/topic/${cat.slug}`}
        href={{
          pathname: `topic`,
          query: {
            slug: cat.slug,
            name: cat.name,
            desc: cat.description,
            getPost: props.postLink + cat.id
          }
        }}>
        <a key={cat.id} className="categories-link">
          {cat.name}
          {i == props.categories.length - 1 ? null : `, `}
        </a>
      </Link>
    ))}
  </span>
);

export default CategoriesListing;
