import React from 'react';
import { State } from "../State";
import { CarModel } from "../entities/CarModel";
import { Requisite } from "../Requisite";
import { Car } from "../entities/Car";
import { HomeModelCard } from "../partials/HomeModelCard";
import { RouteComponentProps } from "react-router-dom";
import { jquery } from "..";

interface IHomeState
{
  models: CarModel[];
  error: Requisite;
  searchModelId: number;
  searchFrom: string;
  searchTo: string;
}

export class Home extends React.Component<RouteComponentProps, IHomeState>
{
  constructor(props: RouteComponentProps)
  {
    super(props);
    this.state = {
      models: new Array<CarModel>(),
      error: new Requisite(),
      searchModelId: 0,
      searchFrom: "",
      searchTo: "",
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }
  componentDidMount()
  {
    State.GetModels().then((response) =>
    {
      console.log(response.data);
      this.setState({
        models: response.data || new Array<CarModel>(),
      });
    })
      .catch((response) =>
      {
        this.setState({
          error: response,
        });
      });
  }

  handleSubmit(event: React.FormEvent)
  {
    event.preventDefault();
    State.searchModelId = Number.parseInt(jquery("#cf-2").val(), 10);
    State.searchFrom = jquery("#cf-3").datepicker("getDate"); // this.state.searchFrom;
    State.searchTo = jquery("#cf-4").datepicker("getDate");

    console.log(State);

    this.props.history.push("/search");
  }

  render()
  {
    return (
      <div>
        <div className="hero" style={{ backgroundImage: "url('images/hero_1_a.jpg')" }}>
          <div className="container">
            <div className="row align-items-center justify-content-center">
              <div className="col-lg-10">
                <div className="row mb-5">
                  <div className="col-lg-7 intro">
                    <h1><strong>Rent a car</strong> is within your finger tips.</h1>
                  </div>
                </div>
                <form className="trip-form" onSubmit={this.handleSubmit}>

                  <div className="row align-items-center">

                    <div className="mb-3 mb-md-0 col-md-3">
                      <select name="" id="cf-2" required className="custom-select form-control">
                        {(this.state.models.map((e) =>
                          <option value={e.id} key={e.id}>{e.name}</option>
                        ))}
                      </select>
                    </div>
                    <div className="mb-3 mb-md-0 col-md-3">
                      <div className="form-control-wrap">
                        <input type="text" id="cf-3" required placeholder="Pick up" className="form-control datepicker px-3" />
                        <span className="icon icon-date_range"></span>
                      </div>
                    </div>
                    <div className="mb-3 mb-md-0 col-md-3">
                      <div className="form-control-wrap">
                        <input type="text" id="cf-4" required placeholder="Drop off" className="form-control datepicker px-3" />
                        <span className="icon icon-date_range"></span>
                      </div>
                    </div>
                    <div className="mb-3 mb-md-0 col-md-3">
                      <input type="submit" value="Search Now" className="btn btn-primary btn-block py-3" />
                    </div>
                  </div>

                </form>

              </div>
            </div>
          </div>
        </div>



        <div className="site-section">
          <div className="container">
            <h2 className="section-heading"><strong>How it works?</strong></h2>
            <p className="mb-5">Easy steps to get you started</p>

            <div className="row mb-5">
              <div className="col-lg-4 mb-4 mb-lg-0">
                <div className="step">
                  <span>1</span>
                  <div className="step-inner">
                    <span className="number text-primary">01.</span>
                    <h3>Select a car</h3>
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Vero, laboriosam!</p>
                  </div>
                </div>
              </div>
              <div className="col-lg-4 mb-4 mb-lg-0">
                <div className="step">
                  <span>2</span>
                  <div className="step-inner">
                    <span className="number text-primary">02.</span>
                    <h3>Fill up form</h3>
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Vero, laboriosam!</p>
                  </div>
                </div>
              </div>
              <div className="col-lg-4 mb-4 mb-lg-0">
                <div className="step">
                  <span>3</span>
                  <div className="step-inner">
                    <span className="number text-primary">03.</span>
                    <h3>Payment</h3>
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Vero, laboriosam!</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-lg-4 mx-auto">
                <a href="#" className="d-flex align-items-center play-now mx-auto">
                  <span className="icon">
                    <span className="icon-play"></span>
                  </span>
                  <span className="caption">Video how it works</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="site-section">
          <div className="container">
            <div className="row align-items-center">
              <div className="col-lg-7 text-center order-lg-2">
                <div className="img-wrap-1 mb-5">
                  <img src="images/feature_01.png" alt="Image" className="img-fluid" />
                </div>
              </div>
              <div className="col-lg-4 ml-auto order-lg-1">
                <h3 className="mb-4 section-heading"><strong>You can easily avail our promo for renting a car.</strong></h3>
                <p className="mb-5">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Repudiandae, explicabo iste a labore id est quas, doloremque veritatis! Provident odit pariatur dolorem quisquam, voluptatibus voluptates optio accusamus, vel quasi quidem!</p>

                <p><a href="#" className="btn btn-primary">Meet them now</a></p>
              </div>
            </div>
          </div>
        </div>



        <div className="site-section bg-light">
          <div className="container">
            <div className="row">
              <div className="col-lg-7">
                <h2 className="section-heading"><strong>Car Listings</strong></h2>
                <p className="mb-5">Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
              </div>
            </div>

            <div className="row">
              {this.state.models.map(e => <HomeModelCard model={e} key={e.id}/>)}
            </div>
          </div>
        </div>

        <div className="site-section">
          <div className="container">
            <div className="row">
              <div className="col-lg-7">
                <h2 className="section-heading"><strong>Features</strong></h2>
                <p className="mb-5">Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
              </div>
            </div>

            <div className="row">
              <div className="col-lg-4 mb-5">
                <div className="service-1 dark">
                  <span className="service-1-icon">
                    <span className="icon-home"></span>
                  </span>
                  <div className="service-1-contents">
                    <h3>Lorem ipsum dolor</h3>
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Obcaecati, laboriosam.</p>
                    <p className="mb-0"><a href="#">Learn more</a></p>
                  </div>
                </div>
              </div>
              <div className="col-lg-4 mb-5">
                <div className="service-1 dark">
                  <span className="service-1-icon">
                    <span className="icon-gear"></span>
                  </span>
                  <div className="service-1-contents">
                    <h3>Lorem ipsum dolor</h3>
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Obcaecati, laboriosam.</p>
                    <p className="mb-0"><a href="#">Learn more</a></p>
                  </div>
                </div>
              </div>
              <div className="col-lg-4 mb-5">
                <div className="service-1 dark">
                  <span className="service-1-icon">
                    <span className="icon-watch_later"></span>
                  </span>
                  <div className="service-1-contents">
                    <h3>Lorem ipsum dolor</h3>
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Obcaecati, laboriosam.</p>
                    <p className="mb-0"><a href="#">Learn more</a></p>
                  </div>
                </div>
              </div>

              <div className="col-lg-4 mb-5">
                <div className="service-1 dark">
                  <span className="service-1-icon">
                    <span className="icon-verified_user"></span>
                  </span>
                  <div className="service-1-contents">
                    <h3>Lorem ipsum dolor</h3>
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Obcaecati, laboriosam.</p>
                    <p className="mb-0"><a href="#">Learn more</a></p>
                  </div>
                </div>
              </div>
              <div className="col-lg-4 mb-5">
                <div className="service-1 dark">
                  <span className="service-1-icon">
                    <span className="icon-video_library"></span>
                  </span>
                  <div className="service-1-contents">
                    <h3>Lorem ipsum dolor</h3>
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Obcaecati, laboriosam.</p>
                    <p className="mb-0"><a href="#">Learn more</a></p>
                  </div>
                </div>
              </div>
              <div className="col-lg-4 mb-5">
                <div className="service-1 dark">
                  <span className="service-1-icon">
                    <span className="icon-vpn_key"></span>
                  </span>
                  <div className="service-1-contents">
                    <h3>Lorem ipsum dolor</h3>
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Obcaecati, laboriosam.</p>
                    <p className="mb-0"><a href="#">Learn more</a></p>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>

        <div className="site-section bg-light">
          <div className="container">
            <div className="row">
              <div className="col-lg-7">
                <h2 className="section-heading"><strong>Testimonials</strong></h2>
                <p className="mb-5">Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
              </div>
            </div>
            <div className="row">
              <div className="col-lg-4 mb-4 mb-lg-0">
                <div className="testimonial-2">
                  <blockquote className="mb-4">
                    <p>"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatem, deserunt eveniet veniam. Ipsam, nam, voluptatum"</p>
                  </blockquote>
                  <div className="d-flex v-card align-items-center">
                    <img src="images/person_1.jpg" alt="Image" className="img-fluid mr-3" />
                    <div className="author-name">
                      <span className="d-block">Mike Fisher</span>
                      <span>Owner, Ford</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-4 mb-4 mb-lg-0">
                <div className="testimonial-2">
                  <blockquote className="mb-4">
                    <p>"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatem, deserunt eveniet veniam. Ipsam, nam, voluptatum"</p>
                  </blockquote>
                  <div className="d-flex v-card align-items-center">
                    <img src="images/person_2.jpg" alt="Image" className="img-fluid mr-3" />
                    <div className="author-name">
                      <span className="d-block">Jean Stanley</span>
                      <span>Traveler</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-4 mb-4 mb-lg-0">
                <div className="testimonial-2">
                  <blockquote className="mb-4">
                    <p>"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatem, deserunt eveniet veniam. Ipsam, nam, voluptatum"</p>
                  </blockquote>
                  <div className="d-flex v-card align-items-center">
                    <img src="images/person_3.jpg" alt="Image" className="img-fluid mr-3" />
                    <div className="author-name">
                      <span className="d-block">Katie Rose</span>
                      <span >Customer</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
