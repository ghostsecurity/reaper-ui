<template>
  <div class="flex h-full flex-col">
    <div class="flex items-center p-2">
      <div class="flex items-center gap-2">
        <Tooltip>
          <TooltipTrigger as-child>
            <Button variant="ghost"
                    size="icon"
                    :disabled="!endpoint">
              <Archive class="size-4" />
              <span class="sr-only">Archive</span>
            </Button>
          </TooltipTrigger>
          <TooltipContent>Archive</TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger as-child>
            <Button variant="ghost"
                    size="icon"
                    :disabled="!endpoint">
              <ArchiveX class="size-4" />
              <span class="sr-only">Move to junk</span>
            </Button>
          </TooltipTrigger>
          <TooltipContent>Move to junk</TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger as-child>
            <Button variant="ghost"
                    size="icon"
                    :disabled="!endpoint">
              <Trash2 class="size-4" />
              <span class="sr-only">Move to trash</span>
            </Button>
          </TooltipTrigger>
          <TooltipContent>Move to trash</TooltipContent>
        </Tooltip>
        <Separator orientation="vertical"
                   class="mx-1 h-6" />
        <Tooltip>
          <Popover>
            <PopoverTrigger as-child>
              <TooltipTrigger as-child>
                <Button variant="ghost"
                        size="icon"
                        :disabled="!endpoint">
                  <Clock class="size-4" />
                  <span class="sr-only">Snooze</span>
                </Button>
              </TooltipTrigger>
            </PopoverTrigger>
            <PopoverContent class="flex w-[535px] p-0">
              <div class="flex flex-col gap-2 border-r px-2 py-4">
                <div class="px-4 text-sm font-medium">
                  Snooze until
                </div>
                <div class="grid min-w-[250px] gap-1">
                  <Button variant="ghost"
                          class="justify-start font-normal">
                    Later today
                    <span class="ml-auto text-muted-foreground">
                      {{ format(addHours(today, 4), "E, h:m b") }}
                    </span>
                  </Button>
                  <Button variant="ghost"
                          class="justify-start font-normal">
                    Tomorrow
                    <span class="ml-auto text-muted-foreground">
                      {{ format(addDays(today, 1), "E, h:m b") }}
                    </span>
                  </Button>
                  <Button variant="ghost"
                          class="justify-start font-normal">
                    This weekend
                    <span class="ml-auto text-muted-foreground">
                      {{ format(nextSaturday(today), "E, h:m b") }}
                    </span>
                  </Button>
                  <Button variant="ghost"
                          class="justify-start font-normal">
                    Next week
                    <span class="ml-auto text-muted-foreground">
                      {{ format(addDays(today, 7), "E, h:m b") }}
                    </span>
                  </Button>
                </div>
              </div>
              <div class="p-2">
                <Calendar />
              </div>
            </PopoverContent>
          </Popover>
          <TooltipContent>Snooze</TooltipContent>
        </Tooltip>
      </div>
      <div class="ml-auto flex items-center gap-2">
        <Tooltip>
          <TooltipTrigger as-child>
            <Button variant="ghost"
                    size="icon"
                    :disabled="!endpoint">
              <Reply class="size-4" />
              <span class="sr-only">Reply</span>
            </Button>
          </TooltipTrigger>
          <TooltipContent>Reply</TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger as-child>
            <Button variant="ghost"
                    size="icon"
                    :disabled="!endpoint">
              <ReplyAll class="size-4" />
              <span class="sr-only">Reply all</span>
            </Button>
          </TooltipTrigger>
          <TooltipContent>Reply all</TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger as-child>
            <Button variant="ghost"
                    size="icon"
                    :disabled="!endpoint">
              <Forward class="size-4" />
              <span class="sr-only">Forward</span>
            </Button>
          </TooltipTrigger>
          <TooltipContent>Forward</TooltipContent>
        </Tooltip>
      </div>
      <Separator orientation="vertical"
                 class="mx-2 h-6" />
      <DropdownMenu>
        <DropdownMenuTrigger as-child>
          <Button variant="ghost"
                  size="icon"
                  :disabled="!endpoint">
            <MoreVertical class="size-4" />
            <span class="sr-only">More</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem>Mark as unread</DropdownMenuItem>
          <DropdownMenuItem>Star thread</DropdownMenuItem>
          <DropdownMenuItem>Add label</DropdownMenuItem>
          <DropdownMenuItem>Mute thread</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
    <Separator />
    <div v-if="endpoint"
         class="flex flex-1 flex-col">
      <div class="flex items-start p-4">
        <div class="flex items-start gap-4 text-sm">
          <div class="grid gap-1">
            <div class="font-semibold">
              {{ endpoint.path }}
            </div>
            <div class="line-clamp-1 text-xs">
              {{ endpoint.method }}
            </div>
            <div class="flex items-center justify-between gap-2 text-xs">
              <div>
                {{ endpoint.hostname }}
              </div>
            </div>
          </div>
        </div>
        <div v-if="endpoint.created_at"
             class="ml-auto text-xs text-muted-foreground space-y-4">
          <div>
            {{ format(new Date(endpoint.created_at), "PPpp") }}
          </div>
          <div>
            <Popover v-model:open="attackTemplateSelectOpen">
              <PopoverTrigger as-child>
                <Button variant="outline"
                        role="combobox"
                        :aria-expanded="attackTemplateSelectOpen"
                        class="w-[200px] justify-between">
                  {{ attackTemplateSelectValue
                    ? frameworks.find((framework) => framework.value === attackTemplateSelectValue)?.label
                    : "Select template tags..." }}
                  <CaretSortIcon class="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent class="w-[200px] p-0">
                <Command>
                  <CommandInput class="h-9"
                                placeholder="Search framework..." />
                  <CommandEmpty>No framework found.</CommandEmpty>
                  <CommandList>
                    <CommandGroup>
                      <CommandItem v-for="framework in frameworks"
                                   :key="framework.value"
                                   :value="framework.value"
                                   @select="(ev) => {
                                    if (typeof ev.detail.value === 'string') {
                                      attackTemplateSelectValue = ev.detail.value
                                    }
                                    attackTemplateSelectOpen = false
                                  }">
                        {{ framework.label }}
                        <CheckIcon class="ml-auto h-4 w-4"
                                   :class="attackTemplateSelectValue === framework.value ? 'opacity-100' : 'opacity-0'" />
                      </CommandItem>
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>
          </div>
          <div class="w-full">
            <Button class="w-full"
                    :disabled="attackRunning"
                    v-if="!attackRunning"
                    @click="startAttack">
              <PocketKnifeIcon class="w-4 h-4 mr-2" /> Start attack
            </Button>
            <Button class="w-full"
                    :disabled="attackRunning"
                    v-if="attackRunning">
              <RefreshCwIcon class="w-4 h-4 mr-2 animate-spin" /> Attack running...
            </Button>
          </div>
        </div>
      </div>
      <Separator />
      <div class="flex h-screen justify-center space-y-2 overflow-y-auto bg-muted/50 p-1 text-sm">
        <div class="text-foreground-muted p-8 font-medium">No results yet. Start an attack.</div>
      </div>
    </div>
    <div v-else
         class="p-8 text-center text-muted-foreground">
      No endpoint selected
    </div>
  </div>
</template>

<script lang="ts" setup>
import { Archive, ArchiveX, Clock, Forward, MoreVertical, PocketKnifeIcon, RefreshCwIcon, Reply, ReplyAll, Trash2 } from 'lucide-vue-next'
import { computed, ref } from 'vue'
import { addDays, addHours, format, nextSaturday } from 'date-fns'
import { Calendar } from '@/components/ui/calendar'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command'
import { CaretSortIcon, CheckIcon } from '@radix-icons/vue'
import type { Endpoint } from '@/stores/endpoint'
import { useEndpointStore } from '@/stores/endpoint'
interface EndpointDisplayProps {
  endpoint: Endpoint | undefined
}

const endpointStore = useEndpointStore()
const attackTemplateSelectOpen = ref(false)
const attackTemplateSelectValue = ref('')
const attackRunning = computed(() => endpointStore.attackRunning)

const props = defineProps<EndpointDisplayProps>()

const today = new Date()

const startAttack = () => {
  // endpointStore.startAttack(props.endpoint)
  endpointStore.startAttack(props.endpoint)
}

const frameworks = [
  { value: '-', label: '-' },
  { value: 'botnet', label: 'botnet' },
  { value: 'bottle', label: 'bottle' },
  { value: 'bouqueteditor_project', label: 'bouqueteditor_project' },
  { value: 'bower', label: 'bower' },
  { value: 'box', label: 'box' },
  { value: 'box-storage', label: 'box-storage' },
  { value: 'bplugins', label: 'bplugins' },
  { value: 'bqe', label: 'bqe' },
  { value: 'brafton', label: 'brafton' },
  { value: 'brandfolder', label: 'brandfolder' },
  { value: 'brave', label: 'brave' },
  { value: 'bravenewcoin', label: 'bravenewcoin' },
  { value: 'bravia', label: 'bravia' },
  { value: 'breach-forums', label: 'breach-forums' },
  { value: 'bricks', label: 'bricks' },
  { value: 'brickset', label: 'brickset' },
  { value: 'brighthr', label: 'brighthr' },
  { value: 'hortonworks', label: 'hortonworks' },
  { value: 'hospital', label: 'hospital' },
  { value: 'hospital_management_system_project', label: 'hospital_management_system_project' },
  { value: 'hostheader-injection', label: 'hostheader-injection' },
  { value: 'hostio', label: 'hostio' },
  { value: 'hostuxsocial-mastodon-instance', label: 'hostuxsocial-mastodon-instance' },
  { value: 'hoteldrui', label: 'hoteldrui' },
  { value: 'hoteldruid', label: 'hoteldruid' },
  { value: 'houzz', label: 'houzz' },
  { value: 'hoverfly', label: 'hoverfly' },
  { value: 'hp', label: 'hp' },
  { value: 'hpe', label: 'hpe' },
  { value: 'hrsale', label: 'hrsale' },
  { value: 'hsc', label: 'hsc' },
  { value: 'hsp', label: 'hsp' },
  { value: 'hsphere', label: 'hsphere' },
  { value: 'html', label: 'html' },
  { value: 'html2pdf', label: 'html2pdf' },
  { value: 'html2wp', label: 'html2wp' },
  { value: 'html2wp_project', label: 'html2wp_project' },
  { value: 'html5-video-player', label: 'html5-video-player' },
  { value: 'htmlcoderhelper', label: 'htmlcoderhelper' },
  { value: 'htmli', label: 'htmli' },
  { value: 'http', label: 'http' },
  { value: 'httpbin', label: 'httpbin' },
  { value: 'httpbrowser', label: 'httpbrowser' },
  { value: 'httpd', label: 'httpd' },
  { value: 'https', label: 'https' },
  { value: 'httpserver', label: 'httpserver' },
  { value: 'huatian', label: 'huatian' },
  { value: 'huawei', label: 'huawei' },
  { value: 'hubpages', label: 'hubpages' },
  { value: 'hubski', label: 'hubski' },
  { value: 'hubspot', label: 'hubspot' },
  { value: 'hue', label: 'hue' },
  { value: 'huemagic', label: 'huemagic' },
  { value: 'hugegraph', label: 'hugegraph' },
  { value: 'hugging-face', label: 'hugging-face' },
  { value: 'huggingface', label: 'huggingface' },
  { value: 'hugo', label: 'hugo' },
  { value: 'huijietong', label: 'huijietong' },
  { value: 'huiwen', label: 'huiwen' },
  { value: 'hunter', label: 'hunter' },
  { value: 'huntr', label: 'huntr' },
  { value: 'hybris', label: 'hybris' },
  { value: 'hydra', label: 'hydra' },
  { value: 'hydra_project', label: 'hydra_project' },
  { value: 'hydracrypt', label: 'hydracrypt' },
  { value: 'hyperic', label: 'hyperic' },
  { value: 'hypertest', label: 'hypertest' },
  { value: 'hytec', label: 'hytec' },
  { value: 'i-mscp', label: 'i-mscp' },
  { value: 'i-plugins', label: 'i-plugins' },
  { value: 'i3geo', label: 'i3geo' },
  { value: 'iam', label: 'iam' },
  { value: 'ibax', label: 'ibax' },
  { value: 'ibenic', label: 'ibenic' },
  { value: 'ibm', label: 'ibm' },
  { value: 'ibm-decision-runner', label: 'ibm-decision-runner' },
  { value: 'ictprotege', label: 'ictprotege' },
  { value: 'idangero', label: 'idangero' },
  { value: 'idea', label: 'idea' },
  { value: 'idehweb', label: 'idehweb' },
  { value: 'idemia', label: 'idemia' },
  { value: 'identity_provider', label: 'identity_provider' },
  { value: 'identityguard', label: 'identityguard' },
  { value: 'identityserver', label: 'identityserver' },
  { value: 'idera', label: 'idera' },
  { value: 'idnovate', label: 'idnovate' },
  { value: 'idoc', label: 'idoc' },
  { value: 'idor', label: 'idor' },
  { value: 'idrac', label: 'idrac' },
  { value: 'ids', label: 'ids' },
  { value: 'idsecure', label: 'idsecure' },
  { value: 'imcat', label: 'imcat' },
  { value: 'imgbb', label: 'imgbb' },
  { value: 'imgproxy', label: 'imgproxy' },
  { value: 'imgsrcru', label: 'imgsrcru' },
  { value: 'imgur', label: 'imgur' },
  { value: 'imm', label: 'imm' },
  { value: 'immich', label: 'immich' },
  { value: 'ghost', label: 'ghost' },
  { value: 'kkfileview', label: 'kkfileview' },
  { value: 'klog', label: 'klog' },
  { value: 'klogserver', label: 'klogserver' },
  { value: 'klr300n', label: 'klr300n' },
  { value: 'kmc_information_systems', label: 'kmc_information_systems' },
  { value: 'kms', label: 'kms' },
  { value: 'knowage', label: 'knowage' },
  { value: 'knowledgetree', label: 'knowledgetree' },
  { value: 'knowyourmeme', label: 'knowyourmeme' },
  { value: 'knr-author-list-widget', label: 'knr-author-list-widget' },
  { value: 'ko-fi', label: 'ko-fi' },
  { value: 'kodbox', label: 'kodbox' },
  { value: 'kodexplorer', label: 'kodexplorer' },
  { value: 'kodi', label: 'kodi' },
  { value: 'kubeview_project', label: 'kubeview_project' },
  { value: 'kuma', label: 'kuma' },
  { value: 'kunalnagar', label: 'kunalnagar' },
  { value: 'kvm', label: 'kvm' },
  { value: 'kwejkpl', label: 'kwejkpl' },
  { value: 'kyan', label: 'kyan' },
  { value: 'smartping', label: 'smartping' },
  { value: 'smartsearchwp', label: 'smartsearchwp' },
  { value: 'smartsense', label: 'smartsense' },
  { value: 'smartsheet', label: 'smartsheet' },
  { value: 'smartstore', label: 'smartstore' },
  { value: 'smartupload', label: 'smartupload' },
  { value: 'smartypantsplugins', label: 'smartypantsplugins' },
  { value: 'smartzone', label: 'smartzone' },
  { value: 'smashballoon', label: 'smashballoon' },
  { value: 'smashrun', label: 'smashrun' },
  { value: 'smb', label: 'smb' },
  { value: 'smelsy', label: 'smelsy' },
  { value: 'smf', label: 'smf' },
  { value: 'smh', label: 'smh' },
  { value: 'smi', label: 'smi' },
  { value: 'smokeping', label: 'smokeping' },
  { value: 'sms', label: 'sms' },
  { value: 'smtp', label: 'smtp' },
  { value: 'socialbundde', label: 'socialbundde' },
  { value: 'sock', label: 'sock' },
  { value: 'socomec', label: 'socomec' },
  { value: 'sofacy', label: 'sofacy' },
  { value: 'sofneta', label: 'sofneta' },
  { value: 'softaculous', label: 'softaculous' },
  { value: 'softether', label: 'softether' },
  { value: 'softlimit', label: 'softlimit' },
  { value: 'softr', label: 'softr' },
  { value: 'softvelum', label: 'softvelum' },
  { value: 'software.realtyna', label: 'software.realtyna' },
  { value: 'softwarepublico', label: 'softwarepublico' },
  { value: 'sofurry', label: 'sofurry' },
  { value: 'sogo', label: 'sogo' },
  { value: 'solara', label: 'solara' },
  { value: 'solari', label: 'solari' },
  { value: 'solarlog', label: 'solarlog' },
  { value: 'solarview', label: 'solarview' },
  { value: 'solarwinds', label: 'solarwinds' },
  { value: 'solikick', label: 'solikick' },
  { value: 'solman', label: 'solman' },
  { value: 'soloby', label: 'soloby' },
  { value: 'soloto', label: 'soloto' },
  { value: 'solr', label: 'solr' },
  { value: 'somansa', label: 'somansa' },
  { value: 'sonarcloud', label: 'sonarcloud' },
  { value: 'sonarqube', label: 'sonarqube' },
  { value: 'sonarr', label: 'sonarr' },
  { value: 'sonarsource', label: 'sonarsource' },
  { value: 'sonatype', label: 'sonatype' },
  { value: 'sonicwall', label: 'sonicwall' },
  { value: 'sony', label: 'sony' },
  { value: 'sophos', label: 'sophos' },
  { value: 'soplanning', label: 'soplanning' },
  { value: 'sound4', label: 'sound4' },
  { value: 'soundcloud', label: 'soundcloud' },
  { value: 'soup', label: 'soup' },
  { value: 'sourceafrica_project', label: 'sourceafrica_project' },
  { value: 'sourcebans', label: 'sourcebans' },
  { value: 'sourcecodester', label: 'sourcecodester' },
  { value: 'webshells', label: 'webshells' },
  { value: 'websitepanel', label: 'websitepanel' },
  { value: 'websocket', label: 'websocket' },
  { value: 'websphere', label: 'websphere' },
  { value: 'websvn', label: 'websvn' },
  { value: 'webtareas', label: 'webtareas' },
  { value: 'webtareas_project', label: 'webtareas_project' },
  { value: 'webtitan', label: 'webtitan' },
  { value: 'webtools', label: 'webtools' },
  { value: 'webtoprint', label: 'webtoprint' },
  { value: 'webtransferclient', label: 'webtransferclient' },
  { value: 'webtrees', label: 'webtrees' },
  { value: 'webui', label: 'webui' },
  { value: 'webuzo', label: 'webuzo' },
  { value: 'whmcs', label: 'whmcs' },
  { value: 'whois', label: 'whois' },
  { value: 'wibu', label: 'wibu' },
  { value: 'widget', label: 'widget' },
  { value: 'wielebenwir', label: 'wielebenwir' },
  { value: 'wifi', label: 'wifi' },
  { value: 'wifisky', label: 'wifisky' },
  { value: 'wiki', label: 'wiki' },
  { value: 'wiki-js', label: 'wiki-js' },
  { value: 'wikidot', label: 'wikidot' },
  { value: 'wikipedia', label: 'wikipedia' },
  { value: 'wildcard', label: 'wildcard' },
  { value: 'wildfly', label: 'wildfly' },
  { value: 'wildix', label: 'wildix' },
  { value: 'wildneutron', label: 'wildneutron' },
  { value: 'wimkin-publicprofile', label: 'wimkin-publicprofile' },
  { value: 'windows', label: 'windows' },
  { value: 'wing', label: 'wing' },
  { value: 'wing-ftp', label: 'wing-ftp' },
  { value: 'winscp', label: 'winscp' },
  { value: 'wintercms', label: 'wintercms' },
  { value: 'wipro', label: 'wipro' },
  { value: 'wireclub', label: 'wireclub' },
  { value: 'wireguard', label: 'wireguard' },
  { value: 'wireless', label: 'wireless' },
  { value: 'wiren', label: 'wiren' },
  { value: 'wisegiga', label: 'wisegiga' },
  { value: 'wishlistr', label: 'wishlistr' },
  { value: 'wishpond', label: 'wishpond' },
  { value: 'withsecure', label: 'withsecure' },
  { value: 'wix', label: 'wix' },
  { value: 'wizard', label: 'wizard' },
  { value: 'wl-500', label: 'wl-500' },
  { value: 'wl-520gu', label: 'wl-520gu' },
  { value: 'wms', label: 'wms' },
  { value: 'wmt', label: 'wmt' },
  { value: 'wmw', label: 'wmw' },
  { value: 'woc-order-alert', label: 'woc-order-alert' },
  { value: 'wolni-slowianie', label: 'wolni-slowianie' },
  { value: 'workreap', label: 'workreap' },
  { value: 'workresources', label: 'workresources' },
  { value: 'workshop', label: 'workshop' },
  { value: 'workspace', label: 'workspace' },
  { value: 'workspaceone', label: 'workspaceone' },
  { value: 'worldserver', label: 'worldserver' },
  { value: 'wow-company', label: 'wow-company' },
  { value: 'wowcms', label: 'wowcms' },
  { value: 'wowhead', label: 'wowhead' },
  { value: 'wowjoomla', label: 'wowjoomla' },
  { value: 'wowonder', label: 'wowonder' },
  { value: 'wowthemes', label: 'wowthemes' },
  { value: 'wowza', label: 'wowza' },
  { value: 'wp', label: 'wp' },
]
</script>
