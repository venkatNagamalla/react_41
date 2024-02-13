import {Component} from 'react'
import Loader from 'react-loader-spinner'
import './index.css'
import VaccinationCoverage from '../VaccinationCoverage'
import VaccinationByGender from '../VaccinationByGender'
import VaccinationByAge from '../VaccinationByAge'

const apiStatusConstants = {
  initial: 'INITIAL',
  inProgress: 'IN_PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class CowinDashboard extends Component {
  state = {apiStatus: apiStatusConstants.initial, vaccinationDetails: {}}

  componentDidMount() {
    this.getCoWinStatus()
  }

  getCoWinStatus = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const vaccinationDataApiUrl = 'https://apis.ccbp.in/covid-vaccination-data'
    const response = await fetch(vaccinationDataApiUrl)
    if (response.ok) {
      const data = await response.json()
      const updatedData = {
        lastSevenDaysVaccination: data.last_7_days_vaccination.map(
          eachItem => ({
            dose1: eachItem.dose_1,
            dose2: eachItem.dose_2,
            vaccineDate: eachItem.vaccine_date,
          }),
        ),
        vaccinationByAge: data.vaccination_by_age.map(eachItem => ({
          age: eachItem.age,
          count: eachItem.count,
        })),
        vaccinationByGender: data.vaccination_by_gender.map(eachItem => ({
          gender: eachItem.gender,
          count: eachItem.count,
        })),
      }
      this.setState({
        vaccinationDetails: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderLoader = () => (
    <div className="container" data-testid="loader">
      <Loader color="#ffffff" type="ThreeDots" height={80} width={80} />
    </div>
  )

  renderFailure = () => (
    <div className="container">
      <img
        className="failure-img"
        src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png"
        alt="failure view"
      />
      <h1 className="failure-desc">Something went wrong</h1>
    </div>
  )

  renderBarCharts = () => {
    const {vaccinationDetails} = this.state
    const {
      lastSevenDaysVaccination,
      vaccinationByAge,
      vaccinationByGender,
    } = vaccinationDetails
    return (
      <>
        <VaccinationCoverage vaccineDetails={lastSevenDaysVaccination} />
        <VaccinationByGender vaccinationByGenderDetails={vaccinationByGender} />
        <VaccinationByAge vaccinationByAgeDetails={vaccinationByAge} />
      </>
    )
  }

  renderSwitchStatements = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.inProgress:
        return this.renderLoader()
      case apiStatusConstants.success:
        return this.renderBarCharts()
      case apiStatusConstants.failure:
        return this.renderFailure()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="bg-container">
        <div className="inner-container">
          <div className="logo-container">
            <img
              className="logo"
              src="https://assets.ccbp.in/frontend/react-js/cowin-logo.png"
              alt="website logo"
            />
            <h1 className="logo-name">Co-WIN</h1>
          </div>
          <h1 className="logo-desc">CoWIN Vaccination in india</h1>
          {this.renderSwitchStatements()}
        </div>
      </div>
    )
  }
}

export default CowinDashboard
