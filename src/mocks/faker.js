import faker from 'faker';

export const generateFakeJobs = (num) => {
  const jobs = [];
  for (let i = 0; i < num; i++) {
    const job = {
      jobTitle: faker.name.jobTitle(),
      jobText: faker.lorem.paragraphs(),
      jobLocation: faker.address.city(),
      salary: faker.finance.amount(),
      closingDate: faker.date.soon(),
      createdAt: faker.date.past(),
      companyName: faker.company.companyName(),
    };
    jobs.push(job);
  }
  return jobs;
};
