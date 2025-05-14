import styles from "./Section.module.css"

interface ChildProps {
  children: React.ReactNode,
}

type SectionProps = ChildProps & {title: string};

export function Section({ children, title }: SectionProps) {
  return (<>

    <div className={styles.sectionTitle}> 
      { title }
    </div>

    <div className={styles.section}>
      { children }
    </div>


  </>);
}
