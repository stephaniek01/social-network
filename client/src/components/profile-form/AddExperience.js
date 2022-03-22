import React, { useContext, useState } from "react";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addExperience } from "../../actions/profile";
import NotyfContext from "../layout/NotyfContext";

const AddExperience = ({ addExperience, history }) => {
  const [formData, setFormData] = useState({
    title: "",
    company: "",
    location: "",
    from: "",
    to: "",
    current: false,
    description: "",
  });

  const { title, company, location, from, to, current, description } = formData;

  const notyf = useContext(NotyfContext);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    addExperience(formData, history).then((val) => {
      if (val.status === "error") val.data.map((err) => notyf.error(err.msg));
      else if (val.status === "success") notyf.success(val.msg);
    });
  };

  return (
    <section className="xl:px-40 px-5 py-6">
      <div className="my-6">
        <h1 className="mb-1 text-xl xl:text-3xl font-extrabold">
          <i className="fas fa-code-branch mr-2"></i>Add Your Experience
        </h1>
        <p className="text-sm xl:text-lg">
          Add any developer/programming positions that you have had in the past
        </p>
      </div>

      <form className="text-center mt-6" onSubmit={(e) => onSubmit(e)}>
        <div className="text-left mb-6">
          <label for="title" className="font-semibold pb-2 inline-block">
            Job Title
          </label>
          <input
            className="rounded-3xl bg-green-100 px-4 py-2 w-full"
            type="text"
            name="title"
            id="title"
            value={title}
            onChange={(e) => handleChange(e)}
            required
          />
        </div>

        <div className="text-left mb-6">
          <label for="company" className="font-semibold pb-2 inline-block">
            Company
          </label>
          <input
            className="rounded-3xl bg-green-100 px-4 py-2 w-full"
            type="text"
            name="company"
            id="company"
            value={company}
            onChange={(e) => handleChange(e)}
            required
          />
        </div>

        <div className="text-left mb-6">
          <label for="location" className="font-semibold pb-2 inline-block">
            Location
          </label>
          <input
            className="rounded-3xl bg-green-100 px-4 py-2 w-full"
            type="text"
            name="location"
            id="location"
            value={location}
            onChange={(e) => handleChange(e)}
            required
          />
        </div>

        <div className="text-left mb-6">
          <label for="from" className="font-semibold pb-2 inline-block">
            From Date
          </label>
          <input
            className="rounded-3xl bg-green-100 px-4 py-2 block"
            type="date"
            name="from"
            id="from"
            value={from}
            onChange={(e) => handleChange(e)}
            required
          />
          <p>
            <label>
              <input
                type="checkbox"
                name="current"
                defaultChecked={current}
                onChange={(e) =>
                  setFormData({ ...formData, current: e.target.checked })
                }
              />{" "}
              Current school or Bootcamp
            </label>
          </p>
        </div>

        {!current && (
          <div className="text-left mb-6">
            <label for="to" className="font-semibold pb-2 inline-block">
              To Date
            </label>
            <input
              className="rounded-3xl bg-green-100 px-4 py-2 block"
              type="date"
              name="to"
              id="to"
              value={to}
              onChange={(e) => handleChange(e)}
              required={!current}
            />
          </div>
        )}

        <div className="text-left mb-6">
          <label for="description" className="font-semibold pb-2 inline-block">
            Job Description
          </label>
          <input
            className="rounded-3xl bg-green-100 px-4 py-2 w-full"
            name="description"
            id="description"
            cols="30"
            rows="5"
            value={description}
            onChange={(e) => handleChange(e)}
          />
        </div>

        <input
          type="submit"
          className="bg-green-400 hover:bg-green-500 focus:bg-green-500 rounded-3xl mt-12 px-4 py-2 mr-2"
        />
        <Link
          className="bg-black hover:bg-gray-600 focus:bg-gray-600 text-white my-1 rounded-3xl mt-12 px-4 py-2"
          to="/dashboard"
        >
          Go Back
        </Link>
      </form>
    </section>
  );
};

AddExperience.propTypes = {
  addExperience: PropTypes.func.isRequired,
};

export default connect(null, { addExperience })(withRouter(AddExperience));
