import ContentCard from "components/contentCard/ContentCard";

function Home() {
  const testData = [
    {
      date: new Date(),
      contents: {
        title: "title 1",
        description: "blah blah blah",
      },
    },
    {
      date: new Date(),
      contents: {
        title: "title 2",
        description: "blah blah blah and more blahs",
      },
    },
  ];
  return (
    <div>
      <h1>Home</h1>

      {testData.map((data, i) => (
        <ContentCard
          key={i}
          dateObject={data.date}
          contentObject={data.contents}
        />
      ))}
    </div>
  );
}

export default Home;
