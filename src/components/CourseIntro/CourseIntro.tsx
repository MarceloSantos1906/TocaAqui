import './CourseIntro.css';

interface CourseIntroProps {
    title: string;
}

function CourseIntro({ title }: CourseIntroProps) {
    return (
        <section className="course-intro">
            <h1 className="course-title">{title}</h1>
        </section>
    );
}

export default CourseIntro;
