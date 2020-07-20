import React, { Fragment } from "react";
import { Formik } from "formik";
import * as Yup from "yup";

const Basic = () => (
  <div>
    <Formik
      initialValues={{
        quizTitle: "",
        branch: [],
        sem: "",
        section: "",
        attempts: "",
        marks: "",
        duration: "",
        startDate: "",
        endDate: "",
      }}
      // validate() gets called on every keystroke/onChange event.
      // And errors{} will have error message of all values/initial values at that moment.
      // Which is awkward because it will show error message for all fields that werent visted yet.
      // Formik's handleBlur keeps list of visited fields in 'visited' object.
      // We can use visted to conditionally render error message, if a user has visited a given field.
      /* 
      validate={(values) => {
        const errors = {};
        if (!values.quizTitle) errors.quizTitle = "Required";
        if (!values.branch) errors.branch = "Required";
        if (!values.sem) errors.sem = "Required";
        if (!values.section) errors.section = "Required";
        if (!values.attempts) errors.attempts = "Required";
        if (!values.marks) errors.marks = "Required";
        if (!values.duration) errors.duration = "Required";
        return errors;
      }}
      */

      // Replacing validate with Yup validation
      // Formik has speacial configuration prop/object for Yup.
      // It automatically transforms yup validation errors into pretty object with keys that match values/ initialValues/ touched
      validationSchema={Yup.object({
        quizTitle: Yup.string()
          .max(15, "Must be 15 characters or less")
          .required("Please enter quiz name"),
        branch: Yup.string().required("Please select branch."),
        sem: Yup.number().required("Please enter sem."),
        section: Yup.string()
          .length(1, "Must be one letter")
          .required("Please enter section"),
        attempts: Yup.number("Attempts must be number").required(
          "Please enter number of attempts"
        ),
        marks: Yup.number("Marks must be number").required(
          "Please enter marks"
        ),
        duration: Yup.number("Enter number of minutes").required(
          "Please enter duration in mins"
        ),
        startDate: Yup.date().required("Please enter start date."),
        endDate: Yup.date().required("Please enter end date"),
      })}
      onSubmit={(values, { setSubmitting }) => {
        setTimeout(() => {
          alert(JSON.stringify(values, null, 2));
          setSubmitting(false);
        }, 400);
      }}
    >
      {({
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        handleSubmit,
        isSubmitting,
        /* and other goodies */
      }) => (
        <React.Fragment>
          <div className="row justify-content-center">
            <div className="col-md-7">
              <form onSubmit={handleSubmit}>
                <div class="form-group row">
                  <label for="quizTitle" class="col-sm-2 col-form-label">
                    Quiz Title:
                  </label>
                  <div class="col-sm-10">
                    <input
                      class={
                        errors.quizTitle && touched.quizTitle
                          ? "form-control is-invalid"
                          : "form-control"
                      }
                      id="quizTitle"
                      placeholder="Enter Quiz Title"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.quizTitle}
                    />
                    <div className="invalid-feedback">{errors.quizTitle}</div>
                  </div>
                </div>

                <div class="form-group row">
                  <label for="branch" class="col-sm-2 col-form-label">
                    Branch:
                  </label>
                  <div class="col-sm-6">
                    <select
                      id="branch"
                      className={
                        errors.branch && touched.branch
                          ? "form-control is-invalid"
                          : "form-control"
                      }
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.branch}
                    >
                      <option defaultValue>Select Branch</option>
                      <option>Computer Science</option>
                    </select>
                    <div className="invalid-feedback">{errors.branch}</div>
                  </div>

                  <label for="sem" class="col-form-label">
                    Semester:
                  </label>
                  <div class="col">
                    <select
                      id="sem"
                      className={
                        errors.sem && touched.sem
                          ? "form-control is-invalid"
                          : "form-control"
                      }
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.sem}
                    >
                      <option defaultValue>Select</option>
                      {[1, 2, 3, 4, 5, 6, 7, 8].map((s) => (
                        <option key={s}>{s}</option>
                      ))}
                    </select>
                    <div className="invalid-feedback">{errors.sem}</div>
                  </div>
                </div>

                <div class="form-group row">
                  <label for="section" class="col-sm-2 col-form-label">
                    Section:
                  </label>
                  <div class="col">
                    <select
                      id="section"
                      className={
                        errors.section && touched.section
                          ? "form-control is-invalid"
                          : "form-control"
                      }
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.section}
                    >
                      <option defaultValue>Select</option>
                      <option>A</option>
                      <option>B</option>
                    </select>
                    <div className="invalid-feedback">{errors.section}</div>
                  </div>

                  <label for="marks" class=" col-form-label">
                    Marks:
                  </label>
                  <div class="col">
                    <input
                      class={
                        errors.marks && touched.marks
                          ? "form-control is-invalid"
                          : "form-control"
                      }
                      id="marks"
                      placeholder="Total"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.marks}
                    />
                    <div className="invalid-feedback">{errors.marks}</div>
                  </div>

                  <label for="attempts" class="col-form-label">
                    Attempts:
                  </label>
                  <div class="col">
                    <input
                      class={
                        errors.attempts && touched.attempts
                          ? "form-control is-invalid"
                          : "form-control"
                      }
                      id="attempts"
                      placeholder="No. of Attempts"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.attempts}
                    />
                    <div className="invalid-feedback">{errors.attempts}</div>
                  </div>
                </div>
                <div class="form-group row">
                  <label for="duration" class="col-sm-2 col-form-label">
                    Duration:
                  </label>
                  <div class="col">
                    <input
                      class={
                        errors.duration && touched.duration
                          ? "form-control is-invalid"
                          : "form-control"
                      }
                      id="duration"
                      placeholder="minutes"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.duration}
                    />
                    <div className="invalid-feedback">{errors.duration}</div>
                  </div>
                  <label for="startDate" className=" col-form-label">
                    Start Date:
                  </label>
                  <div className="col">
                    <input
                      className={
                        errors.startDate && touched.startDate
                          ? "form-control is-invalid"
                          : "form-control"
                      }
                      id="startDate"
                      placeholder=""
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.startDate}
                    />
                    <div className="invalid-feedback">{errors.startDate}</div>
                  </div>
                  <label for="endDate" className="col-form-label">
                    End Date:
                  </label>
                  <div className="col">
                    <input
                      className={
                        errors.endDate && touched.endDate
                          ? "form-control is-invalid"
                          : "form-control"
                      }
                      id="endDate"
                      placeholder=""
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.endDate}
                    />
                    <div className="invalid-feedback">{errors.endDate}</div>
                  </div>
                </div>
                <div className="form-group row">
                  <div className="col-sm-10">
                    <button
                      type="submit"
                      className="btn btn-primary float-left"
                    >
                      Submit
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
          {/* To display content of 'value', 'errors', 'touched' objects */}
          <div className="row">
            <pre className="col">
              {"values" + JSON.stringify(values, null, 2)}
            </pre>
            <pre className="col">
              {"errors" + JSON.stringify(errors, null, 2)}
            </pre>
            <pre className="col">
              {"touched" + JSON.stringify(touched, null, 2)}
            </pre>
          </div>
        </React.Fragment>
      )}
    </Formik>
  </div>
);

export default Basic;
