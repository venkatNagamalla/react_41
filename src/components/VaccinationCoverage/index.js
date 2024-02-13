// Write your code here
import {Bar, XAxis, YAxis, Legend, BarChart} from 'recharts'
import './index.css'

const VaccinationCoverage = props => {
  const {vaccineDetails} = props

  const DataFormatter = number => {
    if (number > 1000) {
      return `${(number / 1000).toString()}k`
    }
    return number.toString()
  }

  return (
    <div className="bar-chart-container">
      <h1 className="bar-chart-heading">Vaccination Coverage</h1>
      <BarChart
        className="resp-container"
        width={900}
        height={500}
        data={vaccineDetails}
        margin={{top: 5}}
      >
        <XAxis
          dataKey="vaccineDate"
          tick={{
            stroke: '#94a3b8',
            strokeWidth: 0.5,
            fontSize: 15,
            fontFamily: 'Roboto',
          }}
        />
        <YAxis
          tickFormatter={DataFormatter}
          tick={{
            stroke: '#94a3b8',
            strokeWidth: 0,
            fontSize: 15,
            fontFamily: 'Roboto',
          }}
        />
        <Legend wrapperStyle={{padding: 30}} />
        <Bar
          dataKey="dose1"
          name="Dose 1"
          fill="#5a8dee"
          barSize="20%"
          radius={[5, 5, 0, 0]}
        />
        <Bar
          dataKey="dose2"
          name="Dose 2"
          fill="#f54394"
          barSize="20%"
          radius={[5, 5, 0, 0]}
        />
      </BarChart>
    </div>
  )
}

export default VaccinationCoverage
