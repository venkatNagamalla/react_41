// Write your code here
import {PieChart, Pie, Cell, Legend} from 'recharts'

const VaccinationByAge = props => {
  const {vaccinationByAgeDetails} = props
  return (
    <div className="bar-chart-container">
      <h1 className="bar-chart-heading">Vaccination by age</h1>
      <PieChart className="pie-container" width={1000} height={300}>
        <Pie
          cx="50%"
          cy="30%"
          data={vaccinationByAgeDetails}
          outerRadius="60%"
          dataKey="count"
        >
          <Cell name="18-40" fill="#5a8dee" />
          <Cell name="40-60" fill="#a3df9f" />
          <Cell name="Above 60" fill="#2cc6c6" />
        </Pie>
        <Legend
          iconType="circle"
          layout="horizontal"
          verticalAlign="bottom"
          align="center"
        />
      </PieChart>
    </div>
  )
}

export default VaccinationByAge
