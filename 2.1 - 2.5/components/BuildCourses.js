import React from 'react'

const BuildCourses = ({courses}) => {
  return (
    <div>
      <h1>Web development curriculum</h1>
      {courses.map(x => <Course course={x} key={x.id}/>)}
    </div>
  )
}

const Part = ({part}) => {
  return (
    <p>{part.name} {part.exercises}</p>
  )
}
const Header = ({name}) =>{
  return(
    <h2>{name}</h2>
  )
}
const Content = ({course}) => {
  return (
    course.parts.map(x => {
      return (
        <Part key={x.id} part={x}/>
      )
    })
  )
}
const Sum = ({parts}) => {
  let total = parts.reduce(((a,b) => a + b.exercises),0)
  return (
    <p><strong>total of {total} exercises</strong></p>
  )
}
const Course = ({course}) => {
  return (
    <div>
      <Header key={course.id} name={course.name} />
      <Content course={course} />
      <Sum parts={course.parts} />
    </div>
  )
}

export default BuildCourses