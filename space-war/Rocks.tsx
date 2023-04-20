<HNode z={-240}>
  <Distribute
    spaceMax={1}
    spaceMin={0.5}
    gapMin={0.5}
    gapMax={1}
    gapFreq={0.1}
    outerBoundRadius={30}
    gladeRadius={10}
    renderItem={(item) => {
      return <Prefab {...item} id="rock_pile_01_t1" s={2} />;
    }}
  />
</HNode>;
