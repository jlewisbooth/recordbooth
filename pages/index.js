import { Divider } from "antd";
import styled from "styled-components";
import { animated, useTransition } from "react-spring";
import { useState, useEffect } from "react";
import { Box, Heading, Image, Anchor, Carousel } from "grommet";
import { MailOption } from "grommet-icons";
import CommonTitle from "../components/general/common-title";

const ImageContainer = styled.div`
  width: 100vw;
  height: 100vh;
  background: black;
  position: absolute;
  left: 0px;
  top: 0px;
`;

const ImageFit = styled.img`
  object-fit: cover;
  height: 100%;
  width: 100%;
`;

const SlantedContainer = styled(animated.div)`
  position: absolute;
  height: 100vh;
  margin: 0;
  top: 0px;
  right: 0px;
  width: ${(props) => props.width || "50%"};
  z-index: ${(props) => props.zin || "1"};

  &:before {
    content: "";
    position: absolute;
    right: 0;
    width: 100%;
    height: 100vh;
    background: ${(props) => props.colour || "#000"};
    transform: skew(10deg);
    transform-origin: top;
    -webkit-box-shadow: -4px 0px 18px 1px rgba(0, 0, 0, 0.64);
    -moz-box-shadow: -4px 0px 18px 1px rgba(0, 0, 0, 0.64);
    box-shadow: -4px 0px 18px 1px rgba(0, 0, 0, 0.64);
  }
`;

const slantedContainers = [
  {
    colour: "#721121",
    width: "100%",
  },
  {
    colour:
      "linear-gradient(75deg, rgba(127,127,127,1) 0%, rgba(222,222,222,1) 100%)",
    width: "98%",
  },
];

export default function Main() {
  const [slants, setSlants] = useState([]);
  const [show, setShow] = useState(false);

  const transitions = useTransition(
    new Array(slants.length).fill(0).map((_, i) => i),
    (p) => p,
    {
      from: { opacity: 0, transform: "translate3d(100%,0,0)" },
      enter: { opacity: 1, transform: "translate3d(0%,0,0)" },
      trail: 100,
    }
  );

  useEffect(() => {
    setTimeout(() => {
      setShow(true);
      setSlants(slantedContainers);
    }, 800);
  }, []);

  return (
    <Box
      height={"100vh"}
      width={"100vw"}
      direction={"row"}
      justify={"end"}
      align={"stretch"}
      background={"#00000000"}
      overflow={"hidden"}
    >
      <CommonTitle>Home</CommonTitle>
      <ImageContainer>
        <ImageFit
          src={"/static/img/background.jpg"}
          preview={false}
          height={"100%"}
        />
      </ImageContainer>
      {
        <Box
          width={"auto"}
          style={{
            position: "relative",
            right: 0,
            top: 0,
            zIndex: 1,
          }}
          height={"100vh"}
          direction={"column"}
          justify={"start"}
          align={"center"}
          gap={"small"}
          pad={{
            left: "150px",
            right: "50px",
          }}
        >
          {transitions.map(({ item, props, key }, i) => {
            const config = slants[item];
            return (
              <SlantedContainer
                style={props}
                key={i}
                zin={i + 1}
                width={config.width}
                colour={config.colour}
              ></SlantedContainer>
            );
          })}
          <Box
            direction={"column"}
            justify={"start"}
            align={"center"}
            gap={"small"}
          >
            {show && (
              <Box
                width={"small"}
                height={"68px"}
                animation={{
                  delay: 1000,
                  type: "fadeIn",
                }}
                style={{
                  zIndex: 10,
                }}
              >
                <Box width={"small"} height={"small"}>
                  <Image src={"/static/img/vinyl.svg"} />
                </Box>
              </Box>
            )}
            {show && (
              <Box
                elevation={"large"}
                pad={"medium"}
                style={{
                  zIndex: 10,
                  position: "relative",
                  overflow: "hidden",
                }}
                animation={{
                  delay: 1100,
                  type: "fadeIn",
                }}
                direction={"column"}
                justify={"start"}
                align={"center"}
                background={"white"}
                border={{
                  side: "all",
                  color: "#721121",
                  size: "small",
                }}
              >
                <Heading
                  margin={"xxsmall"}
                  level={"2"}
                  style={{
                    fontFamily:
                      "Garamond,Baskerville,Baskerville Old Face,Hoefler Text,Times New Roman,serif",
                  }}
                >
                  Record Booth
                </Heading>
                <Divider
                  style={{
                    margin: "5px 0px 20px 0px",
                  }}
                />
                <Heading
                  level={"4"}
                  style={{
                    fontFamily:
                      "Garamond,Baskerville,Baskerville Old Face,Hoefler Text,Times New Roman,serif",
                  }}
                >
                  Coming soon...
                </Heading>
                <Box
                  style={{
                    position: "absolute",
                    left: "0px",
                    top: "0px",
                    width: "100%",
                    height: "100%",
                    zIndex: -1,
                  }}
                >
                  <Image src={"/static/img/paper.jpg"} />
                </Box>
              </Box>
            )}
            {show && (
              <Box
                elevation={"large"}
                pad={"medium"}
                style={{
                  zIndex: 10,
                  position: "relative",
                  overflow: "hidden",
                }}
                animation={{
                  delay: 1200,
                  type: "fadeIn",
                }}
                direction={"column"}
                justify={"start"}
                align={"center"}
                background={"white"}
                border={{
                  side: "all",
                  color: "#721121",
                  size: "small",
                }}
              >
                <Heading
                  level={"3"}
                  margin={"xxsmall"}
                  style={{
                    fontFamily:
                      "Garamond,Baskerville,Baskerville Old Face,Hoefler Text,Times New Roman,serif",
                  }}
                >
                  Contact Us
                </Heading>
                <Divider
                  style={{
                    margin: "5px 0px 20px 0px",
                  }}
                />
                <Box
                  direction={"row"}
                  justify={"start"}
                  align={"center"}
                  fill={"horizontal"}
                >
                  <MailOption size={"small"} />
                  <Box
                    margin={"xxsmall"}
                    margin={{
                      vertical: "xsmall",
                      horizontal: "medium",
                    }}
                    flex={"grow"}
                  >
                    <Anchor
                      margin={"xxsmall"}
                      color={"black"}
                      textAlign={"center"}
                      style={{
                        fontWeight: "normal",
                        textAlign: "center",
                      }}
                      size={"small"}
                      href={"mailto:jack@recordbooth.co.uk"}
                    >
                      jack@recordbooth.co.uk
                    </Anchor>
                  </Box>
                </Box>
                <Box
                  style={{
                    position: "absolute",
                    left: "0px",
                    top: "0px",
                    width: "100%",
                    height: "100%",
                    zIndex: -1,
                  }}
                >
                  <Image src={"/static/img/paper.jpg"} />
                </Box>
              </Box>
            )}
          </Box>
          {show && (
            <Box
              elevation={"large"}
              pad={"medium"}
              style={{
                zIndex: 10,
                position: "relative",
              }}
              animation={{
                delay: 1300,
                type: "fadeIn",
              }}
              direction={"column"}
              justify={"start"}
              align={"center"}
              overflow={"hidden"}
              background={"white"}
              border={{
                side: "all",
                color: "#721121",
                size: "small",
              }}
            >
              <Box height="small" width="small" overflow="hidden">
                <Carousel fill play={4000}>
                  <Image fit="cover" src="/static/img/born-to-run.jpg" />
                  <Image fit="cover" src="/static/img/tapestry.jpg" />
                  <Image fit="cover" src="/static/img/late-for-the-sky.jpg" />
                  <Image fit="cover" src="/static/img/love-supreme.jpg" />
                </Carousel>
              </Box>
              <Divider
                style={{
                  margin: "5px 0px 20px 0px",
                }}
              />
              <Heading
                level={"5"}
                style={{
                  fontFamily:
                    "Garamond,Baskerville,Baskerville Old Face,Hoefler Text,Times New Roman,serif",
                }}
              >
                Build your Collection
              </Heading>
              <Box
                style={{
                  position: "absolute",
                  left: "0px",
                  top: "0px",
                  width: "100%",
                  height: "100%",
                  zIndex: -1,
                }}
              >
                <Image src={"/static/img/paper.jpg"} />
              </Box>
            </Box>
          )}
        </Box>
      }
    </Box>
  );
}
