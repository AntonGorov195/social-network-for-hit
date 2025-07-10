import styles from "./PageNotFound.module.css"

export default function PageNotFound() {
    return (
        <div className={styles["page-not-found-container"]}>
            <div className={styles["page-not-found"]}>
                Oh no! you pages was not found!
            </div>
        </div>)
}