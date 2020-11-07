import request from "supertest";
import { app } from "../../../app";

describe("Add Job", () => {
  it("Returns 400 Bad request when none of the mandatory fields are not provided", async () => {
    return request(app).post("/api/jobs/").send({}).expect(400);
  });
  it("Returns 400 Bad request when Job Type of the mandatory fields is not provided", async () => {
    const info = {
      jobTitle: "UI/UX Designer",
      company: "5465737420436f6d70616e79",
      location: "Kathmandu",
      jobLevel: "Entry Level",
      expiryDate: "2019-10-15",
    };
    return request(app).post("/api/jobs/").send(info).expect(400);
  });
  it("Returns 400 Bad request when Job Title of the mandatory fields is not provided", async () => {
    const info = {
      jobType: "Part time",
      company: "5465737420436f6d70616e79",
      location: "Kathmandu",
      jobLevel: "Entry Level",
      expiryDate: "2019-10-15",
    };
    return request(app).post("/api/jobs/").send(info).expect(400);
  });
  it("Returns 400 Bad request when Company id of the mandatory fields is not provided", async () => {
    const info = {
      jobType: "Part time",
      jobTitle: "UI/UX Designer",
      location: "Kathmandu",
      jobLevel: "Entry Level",
      expiryDate: "2019-10-15",
    };
    return request(app).post("/api/jobs/").send(info).expect(400);
  });
  it("Returns 400 Bad request when Location of the mandatory fields is not provided", async () => {
    const info = {
      jobType: "Part time",
      jobTitle: "UI/UX Designer",
      company: "5465737420436f6d70616e79",
      jobLevel: "Entry Level",
      expiryDate: "2019-10-15",
    };
    return request(app).post("/api/jobs/").send(info).expect(400);
  });
  it("Returns 400 Bad request when Job Level of the mandatory fields is not provided", async () => {
    const info = {
      jobType: "Part time",
      jobTitle: "UI/UX Designer",
      company: "5465737420436f6d70616e79",
      location: "Kathmandu",
      expiryDate: "2019-10-15",
    };
    return request(app).post("/api/jobs/").send(info).expect(400);
  });
  it("Returns 400 Bad request when Expiry Date of the mandatory fields is not provided", async () => {
    const info = {
      jobType: "Part time",
      jobTitle: "UI/UX Designer",
      company: "5465737420436f6d70616e79",
      location: "Kathmandu",
      jobLevel: "Entry Level",
    };
    return request(app).post("/api/jobs/").send(info).expect(400);
  });
  it("Returns a 201 when succesfully created a new job", async () => {
    const info = {
      jobType: "Part time",
      jobTitle: "UI/UX Designer",
      location: "Kathmandu",
      company: "5465737420436f6d70616e79",
      jobLevel: "Entry Level",
      expiryDate: "2019-10-15",
    };
    const response = await request(app)
      .post("/api/jobs/")
      .send(info)
      .expect(201);
    const responseData = response.body;
    /**
     * Removing ID because it is automatically created by mongoose
     */
    delete responseData.id;
    /**
     * Since expiryDate is stored as Date type [2019-10-15 => 2019-10-15T00:00:00.000Z] so we need to parse it.
     */
    responseData.expiryDate = responseData.expiryDate.split("T")[0];
    expect(responseData).toEqual(info);
  });
});
describe("Edit Job", () => {
  it("Returns 400 Bad request an invalid id is passed", async () => {
    const invalidId = "abc";
    return request(app)
      .put(`/api/jobs/${invalidId}`)
      .send({
        jobType: "Part time",
        jobTitle: "UI/UX Designer",
        location: "Kathmandu",
        company: "5465737420436f6d70616e79",
        jobLevel: "Entry Level",
        expiryDate: "2019-10-15",
      })
      .expect(400);
  });
  it("Returns 400 Bad request a valid id is passed that does not exist", async () => {
    const invalidId = "5465737420436f6d70616e79";
    return request(app)
      .put(`/api/jobs/${invalidId}`)
      .send({
        jobType: "Part time",
        jobTitle: "UI/UX Designer",
        location: "Kathmandu",
        company: "5465737420436f6d70616e79",
        jobLevel: "Entry Level",
        expiryDate: "2019-10-15",
      })
      .expect(400);
  });
  it("Returns 400 Bad request when none of the mandatory fields are not provided", async () => {
    const info = {
      jobType: "Part time",
      jobTitle: "UI/UX Designer",
      location: "Kathmandu",
      company: "5465737420436f6d70616e79",
      jobLevel: "Entry Level",
      expiryDate: "2019-10-15",
    };
    const response = await request(app)
      .post("/api/jobs/")
      .send(info)
      .expect(201);
    const { id } = response.body;
    return request(app).put(`/api/jobs/${id}`).send({}).expect(400);
  });
  it("Returns 400 Bad request when Job Type of the mandatory fields is not provided", async () => {
    const info = {
      jobType: "Part time",
      jobTitle: "UI/UX Designer",
      location: "Kathmandu",
      company: "5465737420436f6d70616e79",
      jobLevel: "Entry Level",
      expiryDate: "2019-10-15",
    };
    const response = await request(app)
      .post("/api/jobs/")
      .send(info)
      .expect(201);
    const { id } = response.body;

    return request(app)
      .put(`/api/jobs/${id}`)
      .send({
        jobTitle: "UI/UX Designer",
        location: "Kathmandu",
        company: "5465737420436f6d70616e79",
        jobLevel: "Entry Level",
        expiryDate: "2019-10-15",
      })
      .expect(400);
  });
  it("Returns 400 Bad request when Job Title of the mandatory fields is not provided", async () => {
    const info = {
      jobType: "Part time",
      jobTitle: "UI/UX Designer",
      location: "Kathmandu",
      company: "5465737420436f6d70616e79",
      jobLevel: "Entry Level",
      expiryDate: "2019-10-15",
    };
    const response = await request(app)
      .post("/api/jobs/")
      .send(info)
      .expect(201);
    const { id } = response.body;

    return request(app)
      .put(`/api/jobs/${id}`)
      .send({
        jobType: "Part time",
        location: "Kathmandu",
        company: "5465737420436f6d70616e79",
        jobLevel: "Entry Level",
        expiryDate: "2019-10-15",
      })
      .expect(400);
  });
  it("Returns 400 Bad request when Company id of the mandatory fields is not provided", async () => {
    const info = {
      jobType: "Part time",
      jobTitle: "UI/UX Designer",
      location: "Kathmandu",
      company: "5465737420436f6d70616e79",
      jobLevel: "Entry Level",
      expiryDate: "2019-10-15",
    };
    const response = await request(app)
      .post("/api/jobs/")
      .send(info)
      .expect(201);
    const { id } = response.body;

    return request(app)
      .put(`/api/jobs/${id}`)
      .send({
        jobType: "Part time",
        jobTitle: "UI/UX Designer",
        location: "Kathmandu",
        jobLevel: "Entry Level",
        expiryDate: "2019-10-15",
      })
      .expect(400);
  });
  it("Returns 400 Bad request when Location of the mandatory fields is not provided", async () => {
    const info = {
      jobType: "Part time",
      jobTitle: "UI/UX Designer",
      location: "Kathmandu",
      company: "5465737420436f6d70616e79",
      jobLevel: "Entry Level",
      expiryDate: "2019-10-15",
    };
    const response = await request(app)
      .post("/api/jobs/")
      .send(info)
      .expect(201);
    const { id } = response.body;

    return request(app)
      .put(`/api/jobs/${id}`)
      .send({
        jobType: "Part time",
        jobTitle: "UI/UX Designer",
        company: "5465737420436f6d70616e79",
        jobLevel: "Entry Level",
        expiryDate: "2019-10-15",
      })
      .expect(400);
  });
  it("Returns 400 Bad request when Job Level of the mandatory fields is not provided", async () => {
    const info = {
      jobType: "Part time",
      jobTitle: "UI/UX Designer",
      location: "Kathmandu",
      company: "5465737420436f6d70616e79",
      jobLevel: "Entry Level",
      expiryDate: "2019-10-15",
    };
    const response = await request(app)
      .post("/api/jobs/")
      .send(info)
      .expect(201);
    const { id } = response.body;

    return request(app)
      .put(`/api/jobs/${id}`)
      .send({
        jobType: "Part time",
        jobTitle: "UI/UX Designer",
        location: "Kathmandu",
        company: "5465737420436f6d70616e79",
        expiryDate: "2019-10-15",
      })
      .expect(400);
  });
  it("Returns 400 Bad request when Expiry Date of the mandatory fields is not provided", async () => {
    const info = {
      jobType: "Part time",
      jobTitle: "UI/UX Designer",
      location: "Kathmandu",
      company: "5465737420436f6d70616e79",
      jobLevel: "Entry Level",
      expiryDate: "2019-10-15",
    };
    const response = await request(app)
      .post("/api/jobs/")
      .send(info)
      .expect(201);
    const { id } = response.body;

    return request(app)
      .put(`/api/jobs/${id}`)
      .send({
        jobType: "Part time",
        jobTitle: "UI/UX Designer",
        location: "Kathmandu",
        company: "5465737420436f6d70616e79",
        jobLevel: "Entry Level",
      })
      .expect(400);
  });
  it("Returns 200 after succesfully updaing a job", async () => {
    const info = {
      jobType: "Part time",
      jobTitle: "UI/UX Designer",
      location: "Kathmandu",
      company: "5465737420436f6d70616e79",
      jobLevel: "Entry Level",
      expiryDate: "2019-10-15",
    };
    const response = await request(app)
      .post("/api/jobs/")
      .send(info)
      .expect(201);
    let newJob = response.body;

    const newInfo = {
      ...newJob,
      jobType: "Full time",
      jobTitle: "AI Engineer",
      location: "Pokhara",
      company: "5465737420436f6d70616e79",
      jobLevel: "Senior Level",
    };

    const { body } = await request(app)
      .put(`/api/jobs/${newJob.id}`)
      .send(newInfo)
      .expect(200);

    expect(body).toEqual(newInfo);
  });
});
describe("Delete Job", () => {
  it("Returns 400 Bad request an invalid id is passed", async () => {
    const invalidId = "abc";
    return request(app).delete(`/api/jobs/${invalidId}`).send().expect(400);
  });
  it("Returns 400 Bad request a valid id is passed that does not exist", async () => {
    const invalidId = "5465737420436f6d70616e79";
    return request(app).delete(`/api/jobs/${invalidId}`).send().expect(400);
  });
  it("Return 200 after successfully deleting the job", async () => {
    const info = {
      jobType: "Part time",
      jobTitle: "UI/UX Designer",
      location: "Kathmandu",
      company: "5465737420436f6d70616e79",
      jobLevel: "Entry Level",
      expiryDate: "2019-10-15",
    };
    const { body } = await request(app)
      .post("/api/jobs/")
      .send(info)
      .expect(201);
    const { id } = body;
    await request(app).delete(`/api/jobs/${id}`).send().expect(200);
  });
});
describe("Get Job By Id", () => {
  it("Returns 400 Bad request an invalid id is passed", async () => {
    const invalidId = "abc";
    return request(app).get(`/api/jobs/job/${invalidId}`).send().expect(400);
  });
  it("Returns 400 Bad request a valid id is passed that does not exist", async () => {
    const invalidId = "5465737420436f6d70616e79";
    return request(app).get(`/api/jobs/job/${invalidId}`).send().expect(400);
  });
  it("Return 200 when a valid id that exists is given", async () => {
    /**
     * Adding a job to retrieve
     */
    const info = {
      jobType: "Part time",
      jobTitle: "UI/UX Designer",
      location: "Kathmandu",
      company: "5465737420436f6d70616e79",
      jobLevel: "Entry Level",
      expiryDate: "2019-10-15",
    };
    let response = await request(app).post("/api/jobs/").send(info).expect(201);
    const jobCreated = response.body;
    response = await request(app)
      .get(`/api/jobs/job/${jobCreated.id}`)
      .send()
      .expect(200);
    expect(response.body).toEqual(jobCreated);
  });
});
describe("Get All Jobs", () => {
  it("Retrieve all jobs", async () => {
    /**
     * Adding a job to retrieve
     */
    await request(app)
      .post("/api/jobs/")
      .send({
        jobType: "Part time",
        jobTitle: "UI/UX Designer",
        location: "Kathmandu",
        company: "5465737420436f6d70616e79",
        jobLevel: "Entry Level",
        expiryDate: "2019-10-15",
      })
      .expect(201);
    await request(app)
      .post("/api/jobs/")
      .send({
        jobType: "Full time",
        jobTitle: "AI Engineer",
        location: "Kathmandu",
        company: "5465737420436f6d70616e79",
        jobLevel: "Entry Level",
        expiryDate: "2019-10-15",
      })
      .expect(201);
    const { body } = await request(app).get("/api/jobs/1").send({}).expect(200);
    expect(body).toHaveLength(2);
  });
  9841515304;
  it("Filter and retreve jobs by Job Type", async () => {
    /**
     * Adding a job to retrieve
     */
    await request(app)
      .post("/api/jobs/")
      .send({
        jobType: "Part time",
        jobTitle: "UI/UX Designer",
        location: "Kathmandu",
        company: "5465737420436f6d70616e79",
        jobLevel: "Entry Level",
        expiryDate: "2019-10-15",
      })
      .expect(201);
    await request(app)
      .post("/api/jobs/")
      .send({
        jobType: "Full time",
        jobTitle: "AI Engineer",
        location: "Kathmandu",
        company: "5465737420436f6d70616e79",
        jobLevel: "Entry Level",
        expiryDate: "2019-10-15",
      })
      .expect(201);
    const { body } = await request(app)
      .get("/api/jobs/1")
      .query({ type: "Part time" })
      .send({})
      .expect(200);
    expect(body).toHaveLength(1);
  });
  it("Filter and retreve jobs by Job Level", async () => {
    /**
     * Adding a job to retrieve
     */
    await request(app)
      .post("/api/jobs/")
      .send({
        jobType: "Part time",
        jobTitle: "UI/UX Designer",
        location: "Kathmandu",
        company: "5465737420436f6d70616e79",
        jobLevel: "Entry Level",
        expiryDate: "2019-10-15",
      })
      .expect(201);
    await request(app)
      .post("/api/jobs/")
      .send({
        jobType: "Full time",
        jobTitle: "AI Engineer",
        location: "Kathmandu",
        company: "5465737420436f6d70616e79",
        jobLevel: "Senior Level",
        expiryDate: "2019-10-15",
      })
      .expect(201);
    const { body } = await request(app)
      .get("/api/jobs/1")
      .query({ level: "Senior Level" })
      .send({})
      .expect(200);
    expect(body).toHaveLength(1);
  });


});
