import Agent from "../models/agent.model.js";

export const addAgent = async (req, res) => {
  try {
    const { name, rateperkg, socialLink, mobilenumber, address, address2 } =
      req.body;
    const agent = await Agent.create({
      name: name?.toLowerCase(),
      rateperkg: rateperkg?.toLowerCase(),
      socialLink: socialLink?.toLowerCase(),
      mobilenumber: Number(mobilenumber),
      address: address?.toLowerCase(),
      address2: address2?.toLowerCase(),
    });
    res.status(201).json({
      message: `Agent added`,
      agent,
    });
  } catch (error) {
    res.status(500).json({
      message: `Error in addAgent controller : ${error.message}`,
    });
    console.log(`Error in addAgent controller : ${error}`);
  }
};

export const getAllAgents = async (req, res) => {
  try {
    // const page = req.query.page || 1;
    // const limit = req.query.limit || 10;
    // const skip = (page - 1) * limit;
    const sortField = req.query.sortField || "createdAt"; // default sorting
    const sortOrder = parseInt(req.query.sortOrder) || -1; // 1 = asc, -1 = desc
    const sort = { [sortField]: sortOrder };
    const filter = {};
    if (req.query.name) filter.name = { $regex: req.query.name, $options: "i" };
    if (req.query.rateperkg) filter.rateperkg = req.query.rateperkg;
    if (req.query.socialLink)
      filter.socialLink = { $regex: req.query.socialLink, $options: "i" };
    if (req.query.mobilenumber) filter.mobilenumber = +req.query.mobilenumber;
    if (req.query.address)
      filter.address = { $regex: req.query.address, $options: "i" };
    if (req.query.address2)
      filter.address2 = { $regex: req.query.address2, $options: "i" };

    const agents = await Agent.find({}).sort({ createdAt: -1 });
    // (filter).skip(skip).limit(limit);

    const totalAgents = await agents.length;
    // const totalPages = Math.ceil(totalAgents / limit);

    res.status(200).json({
      agents,
      // currentPage: page,
      // limit,
      // skip,
      // totalPages,
      totalAgents,
    });
  } catch (error) {
    res.status(500).json({
      message: `Error in getAllAgents controller : ${error.message}`,
    });
    console.log(`Error in getAllAgents controller : ${error}`);
  }
};

export const updateAgent = async (req, res) => {
  const { agentId } = req.params;
  const { name, rateperkg, socialLink, mobilenumber, address, address2 } =
    req.body;

  const agent = await Agent.findById(agentId);
  if (name) agent.name = name;
  if (rateperkg) agent.rateperkg = rateperkg;
  if (socialLink) agent.socialLink = socialLink;
  if (mobilenumber) agent.mobilenumber = Number(mobilenumber);
  if (address) agent.address = address;
  if (address2) agent.address2 = address2;
  await agent.save();
  res.status(202).json({
    message: `Agent data updated`,
    agent,
    agentId,
  });
  try {
  } catch (error) {
    res.status(500).json({
      message: `Error in updateAgent controller : ${error.message}`,
    });
    console.log(`Error in updateAgent controller : ${error}`);
  }
};
