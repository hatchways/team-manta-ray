const notificationsAPI = () => {
  return [
    {
      _id: "1",
      type: "message",
      name: "John Smith",
      preview: "Are you going to have any vegan options in the future?",
      link: "/chat/84ab562dfa4371243d1441",
    },
    {
      _id: "2",
      type: "message",
      name: "Sarah Doe",
      preview: "That sushi you made yesterday was delicious! Thank you!",
      link: "/chat/57c86515dgf54510552",
    },
    {
      _id: "3",
      type: "order",
      name: "Adam Sandler",
      preview: "placed an order for $35.00",
      link: "/orders/83b93515dgf5451055",
    },
    {
      _id: "4",
      type: "message",
      name: "Mike Leech",
      preview: "Sounds good. I'll see you soon.",
      link: "/chat/57c341465g15dgf54510552",
    },
  ];
};

export default notificationsAPI;
