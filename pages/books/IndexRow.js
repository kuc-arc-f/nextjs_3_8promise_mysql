import Link from 'next/link';
//import Header from '../Layout/AppHead';

const IndexRow = props => {
//console.log(post)
  return (
  <li>
    ID: {props.id} , 
    <Link href={`/books/${props.id}`}>
      <a>{props.title}</a>
    </Link>
    <Link href={`/books/edit/${props.id}`}>
      <a className="ml-2">[ edit ]</a>
    </Link><br />
    Category : {props.categoryName}    
  </li>
  )
}

export default IndexRow;
