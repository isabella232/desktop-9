/** @jsx jsx */
import { jsx, Grid, Box, Flex, Theme } from "theme-ui"
import { Text, Button } from "gatsby-interface"
import { PropsWithChildren, useCallback } from "react"
import { GatsbySite } from "../controllers/site"
import { useSiteRunnerStatus } from "./site-runners"

interface IProps {
  site: GatsbySite
}

/**
 * The item in the list of sites
 */

export function SitePreview({ site }: PropsWithChildren<IProps>): JSX.Element {
  const { logs, status } = useSiteRunnerStatus(site)

  const stop = useCallback(() => site?.stop(), [site])
  const start = useCallback(() => site?.start(), [site])

  return (
    <Flex
      as={`section`}
      // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
      sx={{
        border: `grey`,
        borderRadius: 2,
        flexDirection: `column`,
        my: 4,
        p: 4,
      }}
    >
      <Flex css={{ justifyContent: `space-between` }}>
        <Text as={`span`} variant="EMPHASIZED">
          {site?.packageJson?.name ?? `Unnamed site`}
        </Text>
        {/* TODO: We can do this better by properly keeping track of running status */}
        {!status || [`STOPPED`, `FAILED`, `INTERRUPTED`].includes(status) ? (
          <Button
            size="S"
            variant="SECONDARY"
            textVariant="BRAND"
            onClick={start}
          >
            Start
          </Button>
        ) : (
          <Button
            size="S"
            variant="SECONDARY"
            textVariant="BRAND"
            onClick={stop}
          >
            Stop
          </Button>
        )}
      </Flex>
      <Text>{status}</Text>
      {!!logs?.length && (
        <details>
          <ul>
            {logs?.map((item, idx) => (
              <li key={idx}>
                <Text as="span">{item}</Text>
              </li>
            ))}
          </ul>
        </details>
      )}
    </Flex>
  )
}
