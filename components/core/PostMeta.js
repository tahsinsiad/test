import styled from '@emotion/styled';
import Link from 'next/link';

export default function PostMeta({
  tags,
  cats,
  fontSize = '11px',
  padding = '2px 5px',
  margin = '0'
}) {
  return (
    <PostListMeta margin={margin}>
      {tags?.map((tag, i) =>
        tag.primary ? (
          <TagSpan fontSize={fontSize} padding={padding} key={tag.term_id}>
            {tag.name[tag.name.length - 1] == 's' ? tag.name.slice(0, -1) : tag.name}
          </TagSpan>
        ) : null
      )}{' '}
      {cats?.map((cat, i) => (
        <CategorySpan key={cat.term_id} fontSize={fontSize} padding={padding} bgColor={cat.color}>
          <Link key={`related-cat-${i}`} href={`/research-pillars/${cat.slug}`}>
            <a className="related-categories">
              {cat.name}
              {/* {i == cats.length - 1 ? null : ` `} */}
            </a>
          </Link>
        </CategorySpan>
      ))}
    </PostListMeta>
  );
}

const PostListMeta = styled.div`
  margin: ${(props) => props.margin};
  span {
    margin-right: 5px;
  }
`;

const TagSpan = styled.span`
  background: #000;
  padding: ${(props) => props.padding};
  color: #fff;
  font-size: ${(props) => props.fontSize};
  text-transform: uppercase;
  font-family: ${(props) => props.theme.font.primary};
  font-weight: 700;
  @media only screen and (max-width: 768px) {
    font-size: 9px;
  }
`;

const CategorySpan = styled.span`
  background: ${(props) => props.bgColor};
  padding: ${(props) => props.padding};
  color: #fff;
  font-size: ${(props) => props.fontSize};
  text-transform: uppercase;
  font-family: ${(props) => props.theme.font.primary};
  font-weight: 700;
  a {
    color: #fff;
    text-transform: uppercase;
    font-weight: 700;
    &:hover {
      color: #000;
    }
  }
  @media only screen and (max-width: 768px) {
    font-size: 9px;
  }
`;
