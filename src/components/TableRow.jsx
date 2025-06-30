export default function TableRow (props) {

    return (
        <div>
            props.items.map((item, index) => (
            <tr key={index} >
                <td> {item.author}</td>
                <td>{item.content}</td>
            </tr>
            ))
        </div>
    )

}